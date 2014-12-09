/* global require */
/* global describe */
/* global beforeEach */

var base = require('../../../../base');

var test = base.helper('test');

var List = base.model('list');
var Item = base.model('item');

var story = test.story;

describe('List Model', function() {
    var list, errors;

    beforeEach(function() {
        list = new List();
    });
    
    story('Valid List Validation')
        .given(aListHasADescriptionOf, 'something')
        .when(theListIsValidated)
        .then(theListShouldBeValid)
        .execute();
    
    story('Required List Description Validation')
        .given(aListHasADescriptionOf, '')
        .when(theListIsValidated)
        .then(theListShouldHaveAValidationError)
        .execute();
    
    story('Required List Description Validation Resolved')
        .given(aListHasADescriptionOf, '')
            .and(aListHasADescriptionOf, 'something')
        .when(theListIsValidated)
        .then(theListShouldBeValid)
        .execute();
    
    story('List Validation with Invalid Item')
        .given(aListHasADescriptionOf, 'something')
            .and(theListHasAnInvalidItem)
        .when(theListIsValidated)
        .then(theListShouldHaveAValidationError)
        .execute();
    
    story('List Validation with Invalid Item Removed')
        .given(aListHasADescriptionOf, 'something')
            .and(theListHasAnInvalidItem)
            .and(theItemIsRemoved)
        .when(theListIsValidated)
        .then(theListShouldBeValid)
        .execute();
    
    function aListHasADescriptionOf(description) {
        list.description(description);
    }
    
    function theListHasAnInvalidItem() {
        list.items.push(new Item());
    }
    
    function theItemIsRemoved() {
        list.items.remove(function() {
            return true;
        });
    }
    
    function theListIsValidated() {
        errors = list.errors();
    }
    
    function theListShouldBeValid() {
        errors.should.be.empty;
        list.isValid().should.be.true;
    }
    
    function theListShouldHaveAValidationError() {
        errors.length.should.not.be.empty;
        list.isValid().should.be.false;
        errors[0]().should.contain('Description');
        errors[0]().should.contain('required');
    }
});