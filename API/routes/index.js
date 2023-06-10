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
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(521).json({error: error, message: "Erro na obtenção da lista de acordãos"})
    })
});

router.get('/acordaos/relatores', function(req, res, next) {
  Acordao.getRelatores()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(523).json({error: error, message: "Erro na obtenção de relatores"})
    })
});

router.get('/acordaos/:id', function(req, res, next) {
  Acordao.getAcordao(req.params.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(522).json({error: error, message: "Erro na obtenção do acordão"})
    })
});

module.exports = router;
