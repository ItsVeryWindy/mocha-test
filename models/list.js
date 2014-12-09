/* global require */
/* global module */
/* global List */

var ko = require('knockout');
require('knockout.validation');

var fs = require('fs');

var Item = require('./item');

eval(fs.readFileSync('./public/js/models/list.js','utf8'));

module.exports = List;