var express = require('express');
var router = express.Router();

var allRoutes = ['one'];
var bower = require('../bower.json');

// Get home page
getRoute();

allRoutes.forEach(function(route) {
  getRoute(route);
});

function getRoute(route) {
  var path = '/' + ((route) ? route : '');
  router.get(path, function(req, res) {
    if (!route) {
      route = allRoutes[0];
    }

    res.render('index', {
      route: route,
      appName: bower.name,
      appTitle: bower.title
    });
  });
}

router.get('/dataSuccess', function(req, res) {
  res.json(require('./dataSuccess.json'));
});

module.exports = router;
