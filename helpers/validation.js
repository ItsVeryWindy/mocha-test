/* global require */
/* global module */

var ko = require('knockout');

function subValidation(obj) {
    var errors = {};
    var hasErrors = false;

    for(var i in obj) {
        var prop = obj[i];

        if(prop.isValid && !prop.isValid()) {
            errors[i] = prop.error();
            hasErrors = true;
        }
        
        var value = obj[i];
        
        if(ko.isObservable(value)) {
            value = value();
        }
        
        if(Object.prototype.toString.call(value) === '[object Array]') {
            var arrayErrors = {};
            var hasArrayErrors = false;

            for(var j = 0; j < value.length; j++) {
                var error = subValidation(value[j]);

                if(error) {
                    arrayErrors[j.toString()] = error;
                    hasArrayErrors = true;
                }
            }
            
            if(hasArrayErrors) {
                errors[i] = arrayErrors;
                hasErrors = true;
            }
        }
    }
    
    return hasErrors ? errors : null; 
}

function validate(objType) {
    return function(obj) {
        var vObj = new (objType)(obj);
        var errors = subValidation(vObj);

        return errors;
    };
}

module.exports = validate;