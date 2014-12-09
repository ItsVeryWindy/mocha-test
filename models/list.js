/* global require */
/* global module */

var ko = require('knockout');
require('knockout.validation');

var Item = require('./item');

function List(list) {
    if(!list) {
        list = {};   
    }
    
    if(!list.description) {
        list.description = '';
    }
    
    if(list._id) {
        this._id = list._id;
    }
    
    this.description = ko.observable(list.description).extend({ 
         required: { message: 'Description is required.' }
    });
    
    this.items = ko.observableArray([]);
    
    if(list.items) {
        for(var i = 0; i < list.items.length; i++) {
            this.items.push(new Item(list.items[i]));
        }
    }
    
    this.errors = ko.validation.group(this, { deep: true, observable: false });
}

module.exports = List;