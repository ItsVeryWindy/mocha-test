var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var mongoose = require('mongoose');

module.exports = {
    decrypt: function(id) {
        var decipher = crypto.createDecipher(algorithm, password)
        var dec = decipher.update(id,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    },
    create: function() {
        return mongoose.Types.ObjectId();
    },
    encrypt: function(id) {
         var cipher = crypto.createCipher(algorithm, password)
         var crypted = cipher.update(id,'utf8','hex')
            crypted += cipher.final('hex');
        return crypted; 
    }
};