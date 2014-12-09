/* global require */
/* global module */

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var mongoose = require('mongoose');

function encrypt(id) {
    id = id.toString();
    
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(id,'utf8','hex');
    
    crypted += cipher.final('hex');
    return crypted; 
}

function decrypt(id) {
    if(!id) {
        return null;
    }
    
    id = id.toString();
    
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(id,'hex','utf8');
        
    dec += decipher.final('utf8');
        
    return dec;
}

function create() {
    return mongoose.Types.ObjectId();
}

function navigateObject(obj, func) {
    if(Object.prototype.toString.call(obj) !== '[object Object]') {
        return;
    }
    
    func(obj);
    
    for(var i in obj) {
        var prop = obj[i];

        if(Object.prototype.toString.call(prop) === '[object Array]') {
            for(var j = 0; j < prop.length; j++) {
                navigateObject(prop[j], func);
            }
        }
    }
}

module.exports = {
    decrypt: decrypt,
    decryptObject: function(obj) {
        navigateObject(obj, function(obj2) {
            if(obj2._id) {
                obj2._id = decrypt(obj2._id);
            }
        });
    },
    create: create,
    createObject: function(obj) {
        navigateObject(obj, function(obj2) {
            if(!obj2._id) {
                obj2._id = create();
            }
        });
    },
    encrypt: encrypt,
    encryptObject: function(obj) {
        navigateObject(obj, function(obj2) {
            if(obj2._id) {
                obj2._id = encrypt(obj2._id);
            }
        });
    }
};