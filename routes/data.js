/* global require */
/* global module */

var express = require('express');
var mongoose = require('mongoose');

var base = require('../base');

var idGenerator = base.helper('idGenerator');

var List = base.model('list');

var Repository = base.repository('mongo');

var listSchema = new mongoose.Schema({ _id: String, description: String, items: [{ _id: String, description: String }] }, { versionKey: false });
var listModel = mongoose.model('List', listSchema);
var validate = base.helper('validation')(List);

var controller = new (base.controller('data'))(idGenerator, new Repository(listModel), validate);

var router = express.Router();

router.get('/', function(req, res) {
    controller.get(null, res);
});

router.get('/:id', function(req, res) {
    controller.get(req.params.id, res);
});

router.post('/', function(req, res) {
    controller.update(req.body, res);
});

module.exports = router;