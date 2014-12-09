/* global require */
/* global module */

var ko = require('knockout');
require('knockout.validation');

function Item(item) {
    if(!item) {
        item = {};
    }
    
//    if(!item.id) {
//        item.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
//            return v.toString(16);
//        });
//    }
//    
//    this.id = item.id;
//     
    if(!item.description) {
        item.description = '';
    }
    
    if(item._id) {
        this._id = item._id;
    }
    
    this.description = ko.observable(item.description).extend({ 
         required: { message: 'Description is required.' }
    });
    
    this.errors = ko.validation.group(this);
}
    
module.exports = Item;