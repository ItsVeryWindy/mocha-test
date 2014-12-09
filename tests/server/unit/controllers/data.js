/* global require */
/* global describe */
/* global beforeEach */

var base = require('../../../../base');

var DataController = base.controller('data');

var test = base.helper('test');

var sinon = test.sinon;
var story = test.story;

describe('Data Controller', function() {
    var dataController, idGenerator, repository, obj, errors, res;

    beforeEach(function() {
        errors = null;
        idGenerator = new TestIdGenerator();
        repository = new TestRepository();
        dataController = new DataController(idGenerator, repository, validate);
        res = new TestResponse();
    });
    
    story('Retrieving a new object')
        .given()
        .when(aNullObjectIsBeingRetrieved)
        .then(theObjectRenderedShouldBeEmpty)
        .execute();
    
    story('Retrieving an object with a known id')
        .given(weHaveAnObject)
            .and(theObjectIsInTheRepository)
        .when(theObjectIsBeingRetrieved)
        .then(theObjectShouldBeRendered)
        .execute();
    
    story('Retrieving an object with an invalid id')
        .given(weHaveAnObject)
            .and(theObjectsIdIsInvalid)
        .when(theObjectIsBeingRetrieved)
        .then(theObjectRenderedShouldBeEmptyWithACodeOf, 400)
        .execute();

    story('Retrieving an object with an unknown id')
        .given(weHaveAnObject)
            .and(theObjectIsUnknown)
        .when(theObjectIsBeingRetrieved)
        .then(theObjectRenderedShouldBeEmptyWithACodeOf, 404)
        .execute();
    
    story('Submitting a new object')
        .given(theIdGeneratorWillCreateAnId)
            .and(weHaveAnObject)
        .when(aNewObjectIsBeingUpdated)
        .then(theObjectShouldBeRendered)
            .and(theObjectShouldHaveBeenUpdatedInTheRepository)
        .execute();
    
    story('Updating an object with an invalid id')
        .given(weHaveAnObject)
            .and(theObjectsIdIsInvalid)
        .when(theObjectIsBeingUpdated)
        .then(theObjectRenderedShouldBeEmptyWithACodeOf, 400)
        .execute();
    
    story('Updating an object with a known id')
        .given(weHaveAnObject)
        .when(theObjectIsBeingUpdated)
        .then(theObjectShouldBeRendered)
            .and(theObjectShouldHaveBeenUpdatedInTheRepository)
        .execute();
    
    story('Updating an invalid object with a known id')
        .given(weHaveAnObject)
            .and(theObjectHasAnError)
        .when(theObjectIsBeingUpdated)
        .then(theErrorShouldBeRenderedWithACodeOf, 400)
        .execute();
    
    function theObjectsIdIsInvalid() {
        idGenerator.invalidId = true;
    }
    
    function theObjectHasAnError() {
        errors = ['a field is missing'];
    }
    
    function theObjectIsUnknown() {
        repository.returnedObject = null;
    }
    
    function theObjectIsInTheRepository() {
        repository.returnedObject = obj;
    }

    function theObjectIsBeingRetrieved() {
        dataController.get(obj._id, res);
    }
    
    function aNullObjectIsBeingRetrieved() {
        dataController.get(null, res);
    }
    
    function theObjectIsBeingUpdated() {
        dataController.update(obj, res);
    }
    
    function aNewObjectIsBeingUpdated() {
        dataController.update({}, res);
    }
    
    function theIdGeneratorWillCreateAnId() {
        idGenerator.createdId = 'aaa';
    }
    
    function weHaveAnObject() {
        obj = {
            _id: 'aaa',
        };
    }
    
    function validate() {
        return errors;
    }

    function theObjectRenderedShouldBeEmptyWithACodeOf(statusCode) {
        res.json.should.have.been.calledWith({}, statusCode);
    }
    
    function theErrorShouldBeRenderedWithACodeOf(statusCode) {
        res.json.should.have.been.calledWith(errors, statusCode);
    }
    
    function theObjectRenderedShouldBeEmpty() {
        res.json.should.have.been.calledWith({});
    }
    
    function theObjectShouldBeRendered() {
        res.json.should.have.been.calledWith(obj);
    }
    
    function theObjectShouldHaveBeenUpdatedInTheRepository() {
        repository.update.should.have.been.calledWith(obj);
    }
});

function TestResponse() {
    this.json = sinon.spy();
}

function TestIdGenerator() {
}

TestIdGenerator.prototype = {
    decrypt: function(id) {
        return this.invalidId ? null : id;
    },
    create: function() {
        return this.createdId;
    },
    encrypt: function(id) {
        return id;
    },
    decryptObject: function() {
        
    },
    createObject: function(obj) {
        if(!obj._id) {
            obj._id = this.create();
        }
    },
    encryptObject: function() {
    },
    createdId: null,
    invalidId: false
};


function TestRepository() {
    
}

TestRepository.prototype = {
    get: function(id, callback) {
        var obj = (this.returnedObject && id == this.returnedObject._id) ? this.returnedObject : null;
        
        callback(obj);
    },
    update: sinon.stub().callsArg(1),
    returnedObject: null
};