var express = require('express');
var router = express.Router();
var passport = require('passport')
var userModel = require('../models/user')
var auth = require('../auth/auth')
var jwt = require('jsonwebtoken')

var User = require('../controllers/user')


router.get('/', function(req, res) {
  console.log("aqiiiiiiii")
  User.list()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp({error: error, message: "Erro na obtenção dos utilizadores"}))
});


router.get('/:id', function(req, res) {
  User.getUser(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(501).jsonp({error: error, message: "Erro na obtenção do utilizador"}))
});


router.post('/', function(req, res) {
  User.addUser(req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(502).jsonp({error: error, message: "Erro na criação do utilizador"}))
});


router.put('/:id', function(req, res) {
  User.updateUser(req.body)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(503).jsonp({error: error, message: "Erro na atualização do utilizador"}))
});


router.delete('/:id', function(req, res) {
  User.deleteUser(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(504).jsonp({error: error, message: "Erro na deleção do utilizador"}))
});


router.post('/login', passport.authenticate('local'), function(req, res) {
  jwt.sign({username: req.user.username, level: req.user.level, sub: 'Acordaos EngWeb2023'},
          "Acordaos2023",
          {expiresIn:3600},
          function(e, token) {
            if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
            else res.status(201).jsonp({token: token})
          })
});


router.post('/register', function(req, res) {
  var date = new Date().toISOString().substring(0,19)
  console.log("register")
  userModel.register(new userModel({username: req.body.username, level: req.body.level, dataCreated: date}),
                      req.body.password,
                      function(err, user){
                        if (err) 
                          res.jsonp({error: err, message: "Register error: " + err})
                        else{
                          passport.authenticate("local")(req, res, function(){
                            jwt.sign({ username: req.user.username, level: req.user.level, sub: 'Acordaos EngWeb2023'}, 
                              "Acordaos2023",
                              {expiresIn: 3600},
                              function(e, token) {
                                if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
                                else res.status(201).jsonp({token: token})
                              });
                          })
                        }  
                      })  

})


module.exports = router;
