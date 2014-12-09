/* global module */

function DataController(idGenerator, repository, validate) {
    this.idGenerator = idGenerator;
    this.repository = repository;
    this.validate = validate;
}

DataController.prototype = {
    get: function(id, res) {
        var idGenerator = this.idGenerator;
        
        if(id) {
            var decodedId = idGenerator.decrypt(id);
            
            if(decodedId) {
                this.repository.get(decodedId, function(obj) {
                    if(obj) {
                        idGenerator.encryptObject(obj);
                    
                        res.json(obj);
                        return;
                    }
                    
                    res.json({}, 404);
                });
                
                return;
            } else {
                res.json({}, 400);
                return;
            }
        }
        
        res.json({});
    },
    update: function(obj, res) {
        var id = obj._id,
            idGenerator = this.idGenerator;
        
        var errors = this.validate(obj);
                
        if(errors !== null) {
            res.json(errors, 400);
            return;
        }
        
        if(id) {
            var decodedId = idGenerator.decrypt(id);
            
            if(decodedId) {
                idGenerator.decryptObject(obj);
                idGenerator.createObject(obj);
                
                this.repository.update(obj, function() {
                    idGenerator.encryptObject(obj);

                    res.json(obj);
                });
                
                return;
            } else {
                res.json({}, 400);
                return;
            }
        }
        
        idGenerator.createObject(obj);
        
        this.repository.update(obj, function() {
            idGenerator.encryptObject(obj);
        
            res.json(obj);
        });
    }
};

module.exports = DataController;