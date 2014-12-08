var ko = require('knockout');
require('knockout.validation');

function List(list) {
    if(!list) {
        list = {
            description: '',
            items: []
        };
    }
    
    this.description = ko.observable(list.description).extend({ 
         required: { message: 'Description is required.' }
    });
    
    this.items = ko.observableArray(list.items);
    
    this.errors = ko.validation.group(this, { deep: true, observable: false });
}

module.exports = List;