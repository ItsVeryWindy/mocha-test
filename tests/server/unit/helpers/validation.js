/* global require */
/* global describe */

var ko = require('knockout');

var base = require('../../../../base');
var validate = base.helper('validation');
var test = base.helper('test');

var story = test.story;
var should = test.should;

describe('Validation Helper', function() {
    var validationFunc, errors;
    
    story('Object is valid')
        .given(weHaveAValidationFunctionForValidObject)
        .when(weValidateAnObject)
        .then(weShouldHaveNoErrors)
        .execute();
    
    story('Object is invalid')
        .given(weHaveAValidationFunctionForInvalidObject)
        .when(weValidateAnObject)
        .then(weShouldHaveTheErrors, {
            invalid: 'my error',
            invalidArray: {
                '0': {
                    invalidInside: 'my error'
                }
            }
        })
        .execute();
    
    function weHaveAValidationFunctionForValidObject() {
        validationFunc = validate(ValidObject);
    }
    
    function weHaveAValidationFunctionForInvalidObject() {
        validationFunc = validate(InvalidObject);
    }
    
    function weValidateAnObject() {
        errors = validationFunc();
    }
    
    function weShouldHaveNoErrors() {
        should.not.exist(errors);
    }
    
    function weShouldHaveTheErrors(error) {
        errors.should.be.like(error);
    }
});

function ValidObject() {
    this.valid = ko.observable();
    
    this.validArray = ko.observableArray([{
        validInside: this.valid
    }]);
}

function InvalidObject() {
    this.invalid = ko.observable();
    
    this.invalid.isValid = function() {
        return false;  
    };
    
    this.invalid.error = function() {
        return 'my error';
    };
    
    this.invalidArray = ko.observableArray([{
        invalidInside: this.invalid
    }]);
}

