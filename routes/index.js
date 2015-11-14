var express = require('express');
var router = express.Router();

var bower = require('../bower.json');

// Get home page
router.get('/', function(req, res) {
  res.render('index', {
    appName: bower.name,
    appTitle: bower.title
  });
});

router.get('/dataSuccess', function(req, res) {
  res.json(require('./dataSuccess.json'));
});

router.get('/dataFail', function(req, res) {
  res.json(require('./dataFailed.json'));
});

module.exports = router;
