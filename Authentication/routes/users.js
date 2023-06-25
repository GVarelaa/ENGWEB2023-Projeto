var express = require('express');
var router = express.Router();
var passport = require('passport')
var userModel = require('../models/user')
var verify = require('../verify/verify')
var jwt = require('jsonwebtoken')
var User = require('../controllers/user')


router.get('/', verify.adminAccess, function (req, res) {
  User.list()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp({ error: error, message: "Erro na obtenção dos utilizadores" }))
});


router.get('/check-email/:email', function (req, res) {
  User.checkEmail(req.params.email)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp({ error: error, message: "Erro na obtenção do email" }))
});


router.get('/check-username/:username', function (req, res) {
  User.checkUsername(req.params.username)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp({ error: error, message: "Erro na obtenção do username" }))
});


router.get('/login/facebook', function (req, res) {
  const returnUrl = req.query.returnUrl;
  req.session.returnUrl = returnUrl;

  passport.authenticate('facebook')(req, res);
});


router.get('/login/facebook/callback', function (req, res, next) {
  passport.authenticate('facebook', function (err, user, info, status) {
    User.updateAccess(user.username, new Date().toISOString().substring(0, 19))
      .then(response => {
        jwt.sign({ username: user.username, level: user.level, sub: 'Acordaos EngWeb2023' },
          "Acordaos2023",
          { expiresIn: 3600 },
          function (e, token) {
            if (e) res.status(500).jsonp({ error: "Erro na geração do token: " + e })
            else {
              res.cookie('token', token)
              res.redirect(req.session.returnUrl)
            }
          })
      })
      .catch(error => {
        res.status(500).jsonp({ error: "Erro a atualizar o último acesso: " + error })
      })
  })(req, res, next)
});


router.get('/login/google', function (req, res) {
  const returnUrl = req.query.returnUrl;
  req.session.returnUrl = returnUrl;

  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
});


router.get('/login/google/callback', function (req, res, next) {
  passport.authenticate('google', function (err, user, info, status) {
    if(user) var username = user.username
    else var username = ""
    User.updateAccess(username, new Date().toISOString().substring(0, 19))
      .then(response => {
        jwt.sign({ username: user.username, level: user.level, sub: 'Acordaos EngWeb2023' },
          "Acordaos2023",
          { expiresIn: 3600 },
          function (e, token) {
            if (e) res.status(500).jsonp({ error: "Erro na geração do token: " + e })
            else {
              res.cookie('token', token)
              res.redirect(req.session.returnUrl)
            }
          })
      })
      .catch(error => {
        res.status(500).jsonp({ error: "Erro a atualizar o último acesso: " + error })
      })
  })(req, res, next)
});



router.get('/:id/favorites', verify.userAccess, function (req, res) {
  User.getFavorites(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(505).jsonp({ error: error, message: "Erro na obtenção dos favorites de um utilizador" }))
});


router.get('/:id', verify.userAccess, function (req, res) {
  User.getUser(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(501).jsonp({ error: error, message: "Erro na obtenção do utilizador" }))
});


router.post('/', verify.adminAccess, function (req, res) {
  User.addUser(req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(502).jsonp({ error: error, message: "Erro na criação do utilizador" }))
});


router.post('/register', function (req, res) {
  userModel.register(new userModel({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    filiation: req.body.filiation,
    level: req.body.level,
    dateCreated: new Date().toISOString().substring(0, 19),
    lastAccess: new Date().toISOString().substring(0, 19)
  }),
    req.body.password,
    function (err, user) {
      if (err) {
        res.jsonp({ error: err, message: "Register error: " + err })
      }
      else {
        passport.authenticate("local")(req, res, function () {
          jwt.sign({ username: req.user.username, level: req.user.level, sub: 'Acordaos EngWeb2023' },
            "Acordaos2023",
            { expiresIn: 3600 },
            function (e, token) {
              if (e) res.status(500).jsonp({ error: "Erro na geração do token: " + e })
              else res.status(201).jsonp({ token: token })
            });
        })
      }
    })
})


router.put('/:id', verify.userAccess, function (req, res) {
  User.updateUser(req.body.username, req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(503).jsonp({ error: error, message: "Erro na atualização do utilizador" }))
});


router.delete('/:id', verify.adminAccess, function (req, res) {
  User.deleteUser(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(504).jsonp({ error: error, message: "Erro na deleção do utilizador" }))
});


router.post('/login', passport.authenticate('local'), function (req, res) {
  User.updateAccess(req.user.username, new Date().toISOString().substring(0, 19))
    .then(response => {
      jwt.sign({ username: req.user.username, level: req.user.level, sub: 'Acordaos EngWeb2023' },
        "Acordaos2023",
        { expiresIn: 3600 },
        function (e, token) {
          if (e) res.status(500).jsonp({ error: "Erro na geração do token: " + e })
          else res.status(201).jsonp({ token: token })
        })
    })
    .catch(error => {
      res.status(500).jsonp({ error: "Erro a atualizar o último acesso: " + e })
    })
});


router.post('/changepassword', verify.userAccess, function (req, res) {
  User.getUser(req.body.username)
    .then(user => {
      user.changePassword(req.body.oldpassword, req.body.newpassword, function (error) {
        if (error) res.status(500).jsonp({ error: "Erro na alteração da password: " + error })
        else res.status(201).jsonp()
      })
    })
    .catch(error => {
      res.status(500).jsonp({ error: "Erro na alteração da password: " + error })
    })
});


router.post('/:id/favorites', verify.userAccess, function (req, res) {
  console.log("favoritos")
  User.updateFavorite(req.params.id, req.body.favorite)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(506).jsonp({ error: error, message: "Erro na adição de um favorito" }))
});


router.delete('/:user/favorites/:favorite', verify.userAccess, function (req, res) {
  User.removeFavorite(req.params.user, req.params.favorite)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(506).jsonp({ error: error, message: "Erro na deleção de um favorito" }))
});


module.exports = router;