var mongoose = require('mongoose');
var base = require('../base')();

mongoose.connect(base.config.database.url);

function MongoRepository(model) {
    this.model = model;
}

MongoRepository.prototype = {
    update: function(obj, callback) {
        var dbObj = new (this.model)(obj);
        
        this.model.update({ _id: obj._id }, obj, { upsert: true }, function(err) {
            callback();
        });
    },
    delete: function(id, callback) {
        this.model.findOneAndRemove({ _id: id }, function(err) {
            callback();
        });
    },
    get: function(id, callback) {
        this.model.findOne({ _id: id }).lean().exec(function(err, dbObj) {
            callback(dbObj);
        });
    }
};

module.exports = MongoRepository;