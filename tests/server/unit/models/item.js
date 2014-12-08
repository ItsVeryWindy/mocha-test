var base = require('../../../../base')();
var story = base.story;
var should = base.should;
var Item = base.model('item');

describe('Item', function() {
    var item, errors;

    beforeEach(function() {
        item = new Item();
    });
    
    story('Valid Item Validation')
        .given(anItemHasADescriptionOf, 'something')
        .when(theItemIsValidated)
        .then(theItemShouldBeValid)
        .execute();
    
    story('Required Item Description Validation')
        .given(anItemHasADescriptionOf, '')
        .when(theItemIsValidated)
        .then(theItemShouldHaveAValidationError)
        .execute();
    
    story('Required Item Description Validation Resolved')
        .given(anItemHasADescriptionOf, '')
            .and(anItemHasADescriptionOf, 'something')
        .when(theItemIsValidated)
        .then(theItemShouldBeValid)
        .execute();
    
    function anItemHasADescriptionOf(description) {
        item.description(description);
    }
    
    function theItemIsValidated() {
        errors = item.errors();
    }
    
    function theItemShouldBeValid() {
        errors.should.be.empty;
        item.isValid().should.be.true;
    }
    
    function theItemShouldHaveAValidationError() {
        errors.length.should.not.be.empty;
        item.isValid().should.be.false;
        errors[0]().should.contain('Description');
        errors[0]().should.contain('required');
    }
});