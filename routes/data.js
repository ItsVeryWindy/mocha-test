var express = require('express');
var base = require('../base')();
var idGenerator = base.helper('idGenerator');
var repository = base.repository('mongo');
var controller = new (base.controller('data'))(idGenerator, repository, null);
var router = express.Router();

router.get('/', function(req, res) {
    controller.get(null, res.json);
});

router.get('/:id', function(req, res) {
    controller.get(req.params.id, res.json);
});

router.post('/', function(req, res) {
    controller.update(req.body, res.json);
});

module.exports = router;