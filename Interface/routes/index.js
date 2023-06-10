var express = require('express');
var router = express.Router();
var axios = require('axios');
var env = require('../config/env')

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint)
    .then(response => {
      res.render('index', {list: response.data, d: date})
    })
    .catch(error => {
      res.render('error', {error: error})
    })
});


router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0,19)
  axios.get(env.apiAccessPoint + '/' + req.params.id)
    .then(response => {
      res.render('acordao', {a: response.data, d: date})
    })
    .catch(error => {
      res.render('error', {error: error})
    })
});

module.exports = router;
