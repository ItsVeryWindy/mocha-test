var base = require('../base')();

var DataController = base.controller('data');
var sinon = base.sinon;
var story = base.story;

describe('Data Controller', function() {
    var json, dataController, idGenerator, repository, obj;

    beforeEach(function() {
        json = sinon.spy();
        
        idGenerator = new TestIdGenerator();
        repository = new TestRepository();
        dataController = new DataController(idGenerator, repository);
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
        .then(theObjectRenderedShouldBeEmptyWithACodeOf, 403)
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
        .then(theObjectRenderedShouldBeEmptyWithACodeOf, 403)
        .execute();
    
    story('Updating an object with a known id')
        .given(weHaveAnObject)
        .when(theObjectIsBeingUpdated)
        .then(theObjectShouldBeRendered)
            .and(theObjectShouldHaveBeenUpdatedInTheRepository)
        .execute();
    
    function theObjectsIdIsInvalid() {
        idGenerator.invalidId = true;
    }
    
    function theObjectIsUnknown() {
        repository.returnedObject = null;
    }
    
    function theObjectIsInTheRepository() {
        repository.returnedObject = obj;
    }

    function theObjectIsBeingRetrieved() {
        dataController.get(obj.id, json);
    }
    
    function aNullObjectIsBeingRetrieved() {
        dataController.get(null, json);
    }
    
    function theObjectIsBeingUpdated() {
        dataController.update(obj, json);
    }
    
    function aNewObjectIsBeingUpdated() {
        dataController.update({}, json);
    }
    
    function theIdGeneratorWillCreateAnId() {
        idGenerator.createdId = 'aaa';
    }
    
    function weHaveAnObject() {
        obj = {
            id: 'aaa'
        };
    }

    function theObjectRenderedShouldBeEmptyWithACodeOf(statusCode) {
        json.should.have.been.calledWith({}, statusCode);
    }
    
    function theObjectRenderedShouldBeEmpty() {
        json.should.have.been.calledWith({});
    }
    
    function theObjectShouldBeRendered() {
        json.should.have.been.calledWith(obj);
    }
    
    function theObjectShouldHaveBeenUpdatedInTheRepository() {
        repository.update.should.have.been.calledWith(obj);
    }
});

function TestIdGenerator() {
}

TestIdGenerator.prototype = {
    get: function(id) {
        return this.invalidId ? null : id;
    },
    create: function() {
        return this.createdId;
    },
    encode: function(id) {
        return id;
    },
    createdId: null,
    invalidId: false
};


function TestRepository() {
    
}

TestRepository.prototype = {
    get: function(id) {
        return (this.returnedObject && id == this.returnedObject.id) ? this.returnedObject : null;
    },
    update: sinon.spy(),
    returnedObject: null
};