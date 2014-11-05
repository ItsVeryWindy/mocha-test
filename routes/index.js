var express = require('express');
var controller = require('../controllers/index');
var router = express.Router();

/* GET home page. */
router.get('/', controller.index);

router.get('/test', controller.test);

module.exports = router;
