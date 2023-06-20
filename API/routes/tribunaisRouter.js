var express = require('express');
var router = express.Router();
var Tribunal = require('../controllers/tribunal')

router.get('/', function (req, res, next) {
    Tribunal.list()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(523).json({ error: error, message: "Erro na obtenção da lista de tribunais" }))
})

router.get('/:id/descritores', function (req, res, next) {
    Tribunal.getDescritores(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(522).json({ error: error, message: "Erro na obtenção dos descritores" }))
})

router.delete('/:id', function (req, res, next) {
    Tribunal.deleteAcordao(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(524).json({ error: error, message: "Erro na deleção do tribunal" }))
})


router.put('/:id', function (req, res, next) {
    Tribunal.updateTribunal(req.body)
        .then(data => res.status(201).json(data))
        .catch(error => res.status(525).json({ error: error, message: "Erro a atualizar tribunal." }))
})


router.post('/', function (req, res, next) {
    Tribunal.addTribunal(req.body)
        .then(data => res.status(201).json(data))
        .catch(error => res.status(526).json({ error: error, message: "Erro a adicionar tribunal." }))
})


module.exports = router;
