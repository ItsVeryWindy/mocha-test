var base = require('../../../../base')();

var idGenerator = base.helper('idGenerator');
var sinon = base.sinon;
var story = base.story;

describe('Id Generator', function() {
    var id, anotherId, encryptedId, decryptedId;
    
    story('Generating Unique Ids')
        .given(weCreateAnId)
        .when(weCreateAnotherId)
        .then(theIdsShouldBeDifferent)
        .execute();
    
    story('Id Decryption')
        .given(weHaveAnIdOf, 'aaa')
            .and(theIdIsEncrypted)
        .when(theIdIsDecrypted)
        .then(theIdShouldBe, 'aaa')
        .execute();
    
    story('Id Encryption')
        .given(weHaveAnIdOf, 'aaa')
        .when(theIdIsEncrypted)
        .then(theIdShouldNotBe, 'aaa')
        .execute();
    
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
});