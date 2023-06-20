var express = require('express');
var router = express.Router();
var Acordao = require('../controllers/acordao')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.query.search) {
    Acordao.search(req.query.search)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(521).json({ error: error, message: "Erro na obtenção da lista de acordãos" }))
  }
  else {
    var skip = 0, limit = 0

    if (req.query.skip) {
      skip = req.query.skip
      delete req.query.skip
    }

    if (req.query.limit) {
      limit = req.query.limit
      delete req.query.limit
    }

    Acordao.list(req.query, skip, limit)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(521).json({ error: error, message: "Erro na obtenção da lista de acordãos" }))
  }
});


router.get('/number', function (req, res, next) {
  Acordao.getAcordaosNumber()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(523).json({ error: error, message: "Erro na obtenção do número de acordãos" }))
});


router.get('/relatores', function (req, res, next) {
  Acordao.getRelatores()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(523).json({ error: error, message: "Erro na obtenção de relatores" }))
});



router.get('/:id', function (req, res, next) {
  Acordao.getAcordao(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(522).json({ error: error, message: "Erro na obtenção do acordão" }))
});


router.post('/', function (req, res, next) {
  Acordao.addAcordao(req.body)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(523).json({ error: error, message: "Erro na criação do acordão" }))
});


router.delete('/:id', function (req, res, next) {
  Acordao.deleteAcordao(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(524).json({ error: error, message: "Erro na deleção do acordão" }))
});



router.put('/:id', function (req, res) {
  Acordao.updateAcordao(req.body)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(525).json({ error: error, message: "Erro a atualizar acordão." }))
})





module.exports = router;
