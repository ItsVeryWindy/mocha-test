/* global require */
/* global module */
/* global Item */

var ko = require('knockout');
require('knockout.validation');

var fs = require('fs');

eval(fs.readFileSync('./public/js/models/item.js','utf8'));
    
module.exports = Item;