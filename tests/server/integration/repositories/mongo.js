/* global require */
/* global describe */

var mongoose = require('mongoose');

var base = require('../../../../base');
var test = base.helper('test');

var MongoRepository = base.repository('mongo');
var story = test.storyAsync;
var should = test.should;

describe('Mongo Repository', function() {
    var testSchema = new mongoose.Schema({ _id: String, name: String }, { versionKey: false });
    var test = mongoose.model('Test', testSchema);
    
    story('Adding an object and retrieving it', 5000)
        .given(weHaveARepository)
            .and(weHaveAnObjectWithAnIdOf, '1')
            .and(theObjectHasBeenDeleted)
            .and(theObjectHasBeenAdded)
        .when(theObjectHasBeenRetrieved)
        .then(theObjectShouldBeTheSame)
        .execute();
    
    story('Deleting an object and then trying to retrieve it', 5000)
        .given(weHaveARepository)
            .and(weHaveAnObjectWithAnIdOf, '2')
            .and(theObjectHasBeenAdded)
            .and(theObjectHasBeenDeleted)
        .when(theObjectHasBeenRetrieved)
        .then(theObjectShouldNotExist)
        .execute();
    
    story('Updating an object and retrieving it', 5000)
        .given(weHaveARepository)
            .and(weHaveAnObjectWithAnIdOf, '3')
            .and(theObjectHasBeenDeleted)
            .and(theObjectHasBeenAdded)
            .and(theObjectHasBeenUpdated)
        .when(theObjectHasBeenRetrieved)
        .then(theObjectShouldBeTheSame)
        .execute();
    
    function weHaveARepository(store, next) {
        store.repository = new MongoRepository(test);
        next();
    }
    
    function weHaveAnObjectWithAnIdOf(store, next, id) {
        store.obj = {
            _id: id,
            name: 'Test'
        };
        
        next();
    }
    
    function theObjectHasBeenAdded(store, next) {
        store.repository.update(store.obj, function() {
            next();
        });
    }
    
    function theObjectHasBeenUpdated(store, next) {
        store.obj.name = 'Test2';
        
        store.repository.update(store.obj, function() {
            next();
        });
    }
    
    function theObjectHasBeenRetrieved(store, next) {
        store.repository.get(store.obj._id, function(dbObj) {
            store.returnedObject = dbObj;
            next();
        });
    }
    
    function theObjectHasBeenDeleted(store, next) {
        store.repository.delete(store.obj._id, function() {
            next();
        });
    }
    
    function theObjectShouldNotExist(store, next) {
        should.not.exist(store.returnedObject);
        next();
    }
    
    function theObjectShouldBeTheSame(store, next) {
        //console.log(store.returnedObject);
        store.returnedObject.should.be.like(store.obj);
        next();
    }
});