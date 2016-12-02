var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('historygen', { title: 'History Generator' });
});

module.exports = router;
