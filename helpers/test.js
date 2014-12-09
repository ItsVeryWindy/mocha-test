/* global require */
/* global module */
/* global it */

var fs = require('fs');

eval(fs.readFileSync('./tests/client/js/test.js','utf8'));

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");

var should = chai.should();

chai.use(sinonChai);
chai.use(require('chai-fuzzy'));

module.exports = {
    sinon: sinon,
    story: story,
    storyAsync: storyAsync,
    should: should,
};