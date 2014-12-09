/* global require */
/* global module */

var yaml_config = require('node-yaml-config');
var fs = require('fs');

var configName = 'config.yml';

fs.watch(configName, {
  persistent: true
}, function() {
  webConfig = null;
});

var webConfig;

function config() {
    if(!webConfig) {
        webConfig = yaml_config.load('config.yml');
    }
    
    return webConfig;
}

function controller(name) {
    return require('./controllers/' + name);
}
    
function validator(name) {
    return require('./validators/' + name);
}
    
function model(name) {
    return require('./models/' + name);
}
    
function repository(name) {
    return require('./repositories/' + name);
}
    
function helper(name) {
    return require('./helpers/' + name);
}

module.exports = {
    controller: controller,
    validator: validator,
    model: model,
    helper: helper,
    repository: repository,
    config: config
};