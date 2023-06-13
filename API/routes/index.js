var express = require('express');
var router = express.Router();
var Acordao = require('../controllers/acordao')

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


router.get('/acordaos/:id', function(req, res, next) {
  Acordao.getAcordao(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(522).json({error: error, message: "Erro na obtenção do acordão"}))
});


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


router.put('/acordaos/:id', function(req, res){
  Acordao.updateAcordao(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(525).json({erro: erro, mensagem: "Erro a atualizar acordão."}))
})

module.exports = router;
