/* global require */
/* global describe */

var base = require('../../../../base');

var idGenerator = base.helper('idGenerator');
var test = base.helper('test');

var story = test.story;
var should = test.should;

describe('Id Generator Helper', function() {
    var id, anotherId, encryptedId, decryptedId, obj;
    
    story('Generating Unique Ids')
        .given(weCreateAnId)
        .when(weCreateAnotherId)
        .then(theIdsShouldBeDifferent)
        .execute();
    
    story('Generating Object Unique Ids')
        .given(weHaveAnObject)
        .when(weCreateAnObjectsIds)
        .then(theObjectsIdsShouldBeDifferent)
        .execute();

    story('Id Decryption for Empty Id')
        .given(weHaveAnIdOf, null)
        .when(theIdIsDecrypted)
        .then(theIdShouldBeNull)
        .execute();
    
    story('Id Decryption')
        .given(weHaveAnIdOf, 'aaa')
            .and(theIdIsEncrypted)
        .when(theIdIsDecrypted)
        .then(theIdShouldBe, 'aaa')
        .execute();
    
    story('Id Object Decryption')
        .given(weHaveAnObjectWithAnIdOf, 'aaa')
            .and(theObjectIsEncrypted)
        .when(theObjectIsDecrypted)
        .then(theObjectsIdShouldBe, 'aaa')
        .execute();
    
    story('Id Encryption')
        .given(weHaveAnIdOf, 'aaa')
        .when(theIdIsEncrypted)
        .then(theIdShouldNotBe, 'aaa')
        .execute();
    
    story('Id Object Encryption')
        .given(weHaveAnObjectWithAnIdOf, 'aaa')
        .when(theObjectIsEncrypted)
        .then(theObjectsIdShouldNotBe, 'aaa')
        .execute();
    
    function weHaveAnObject() {
        obj = {
            child: [{
            }]
        };
    }
    
    function weCreateAnObjectsIds() {
        idGenerator.createObject(obj);
    }
    
    function theObjectsIdsShouldBeDifferent() {
        should.exist(obj._id);
        should.exist(obj.child[0]._id);
        obj._id.should.not.equal(obj.child[0]._id);
    }
    
    function weHaveAnObjectWithAnIdOf(id) {
        obj = {
            _id: id,
            child: [{
                _id: id
            }]
        };
    }
    
    function theObjectIsEncrypted() {
        idGenerator.encryptObject(obj);
    }
    
    function theObjectIsDecrypted() {
        idGenerator.decryptObject(obj);
    }
    
    function theObjectsIdShouldBe(id) {
        obj._id.should.equal(id);
        obj.child[0]._id.should.equal(id);
    }
    
    function theObjectsIdShouldNotBe(id) {
        obj._id.should.not.equal(id);
        obj.child[0]._id.should.not.equal(id);
    }
    
    function weCreateAnId() {
        id = idGenerator.create();
    }
    
    function weCreateAnotherId() {
        anotherId = idGenerator.create();
    }
    
    function theIdsShouldBeDifferent() {
        id.should.not.equal(anotherId);
    }
    
    function weHaveAnIdOf(idValue) {
        id = idValue;
    }

    function theIdIsEncrypted() {
        encryptedId = idGenerator.encrypt(id);
    }
    
    function theIdIsDecrypted() {
        decryptedId = idGenerator.decrypt(encryptedId);
    }
    
    function theIdShouldBe(idValue) {
        decryptedId.should.equal(idValue);
    }
    
    function theIdShouldNotBe(idValue) {
        encryptedId.should.not.equal(idValue);
    }
    
    function theIdShouldBeNull() {
        should.not.exist(encryptedId);
    }
});