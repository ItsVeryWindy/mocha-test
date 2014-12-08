var ko = require('knockout');
require('knockout.validation');

function Item(item) {
    if(!item) {
        item = {
            description: ''
        };
    }
    
    this.description = ko.observable(item.description).extend({ 
         required: { message: 'Description is required.' }
    });
    
    this.errors = ko.validation.group(this);
}

module.exports = Item;