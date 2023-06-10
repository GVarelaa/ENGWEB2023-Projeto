var express = require('express');
var router = express.Router();
var Acordao = require('../controllers/acordao')

/* GET home page. */
router.get('/acordaos', function(req, res, next) {
  Acordao.list()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(521).json({error: error, message: "Erro na obtenção da lista de acordãos"})
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
