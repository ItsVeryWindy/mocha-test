var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");

var DataController = require('../../controllers/data');

chai.should();
chai.use(sinonChai);

describe('Data Controller', function() {
    var json, dataController, idGenerator, repository;

    before(function() {
        json = sinon.spy();
        
        idGenerator = new TestIdGenerator();
        repository = new TestRepository();
        dataController = new DataController(idGenerator, repository);
    });

    it('should output an empty object when no id is provided', function() {
        dataController.get(null, json);
        
        json.should.have.been.calledWith({});
    });
    
    it('should output the object from repository when id is provided', function() {
        var obj = {
            id: 'aaa'
        };
        
        repository.returnedObject = obj;
        
        dataController.get(obj.id, json);
        
        json.should.have.been.calledWith(obj);
    });
    
    it('should create the object in the repository and output the updated instance with an id', function() {
        var obj = {
            id: 'aaa'
        };
        
        idGenerator.createdId = obj.id;
        
        dataController.update({}, json);
        
        repository.update.should.have.been.calledWith(obj);
        json.should.have.been.calledWith(obj);
    });
});

function TestIdGenerator() {
}

TestIdGenerator.prototype = {
    get: function(id) {
        return id;
    },
    create: function() {
        return this.createdId;
    },
    createdId: null
};


function TestRepository() {
    
}

TestRepository.prototype = {
    get: function(id) {
        return id == this.returnedObject.id ? this.returnedObject : null;
    },
    update: sinon.spy(),
    returnedObject: null
};