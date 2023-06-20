var express = require('express');
var router = express.Router();
var Acordao = require('../controllers/acordao')
var Tribunal = require('../controllers/tribunal')

/* GET home page. */
router.get('/acordaos', function(req, res, next) {
  var skip = 0
  var limit = 0

  if(req.query.skip){
    skip = req.query.skip
    delete req.query.skip
  }

  if(req.query.limit){
    limit = req.query.limit
    delete req.query.limit
  }
  
  Acordao.list(req.query, skip, limit)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(521).json({error: error, message: "Erro na obtenção da lista de acordãos"}))
});


router.get('/acordaos/number', function(req, res, next) {
  Acordao.getAcordaosNumber()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(523).json({error: error, message: "Erro na obtenção do número de acordãos"}))
});


router.get('/acordaos/relatores', function(req, res, next) {
  Acordao.getRelatores()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(523).json({error: error, message: "Erro na obtenção de relatores"}))
});


router.get('/tribunais', function(req, res, next) {
  Tribunal.list()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(523).json({error: error, message: "Erro na obtenção da lista de tribunais"}))
})


router.get('/acordaos/:id', function(req, res, next) {
  Acordao.getAcordao(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(522).json({error: error, message: "Erro na obtenção do acordão"}))
});


router.get('/tribunais/:id/descritores', function(req, res, next) {
  Tribunal.getDescritores(req.params.id)
    .then( data => res.status(200).json(data))
    .catch(error => res.status(522).json({error: error, message: "Erro na obtenção dos descritores"}))
})


router.post('/acordaos', function(req, res, next) {
  Acordao.addAcordao(req.body)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(523).json({error: error, message: "Erro na criação do acordão"}))
});


router.delete('/acordaos/:id', function(req, res, next) {
  Acordao.deleteAcordao(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(524).json({error: error, message: "Erro na deleção do acordão"}))
});


router.delete('tribunais/:id', function(req, res, next) {
  Tribunal.deleteAcordao(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(524).json({error: error, message: "Erro na deleção do tribunal"}))
})


router.put('/acordaos/:id', function(req, res){
  Acordao.updateAcordao(req.body)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(525).json({error: error, message: "Erro a atualizar acordão."}))
})


router.put('/tribunais/:id', function(req, res){
  Tribunal.updateTribunal(req.body)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(525).json({error: error, message: "Erro a atualizar tribunal."}))
})


module.exports = router;
