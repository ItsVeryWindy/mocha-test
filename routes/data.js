var express = require('express');
var controller = new (require('../controllers/data'))(null, null);
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