function DataController(idGenerator, repository, validate) {
    this.idGenerator = idGenerator;
    this.repository = repository;
    this.validate = validate;
}

DataController.prototype = {
    get: function(id, json) {
        var obj;
        
        if(id) {
            var decodedId = this.idGenerator.decrypt(id);
            
            if(decodedId) {
                this.repository.get(decodedId, function(dbObj) {
                    obj = dbObj;
                    
                    if(obj) {
                        obj._id = id;

                        json(obj);
                        return;
                    }
                    
                    json({}, 404);
                });
                
                return;
            } else {
                json({}, 400);
                return;
            }
        }
        
        json({});
    },
    update: function(obj, json) {
        var id = obj._id,
            idGenerator = this.idGenerator;
        
        if(id) {
            var decodedId = idGenerator.decrypt(id);
            
            if(decodedId) {
                obj._id = decodedId;
                
                var errors = this.validate(obj);
                
                if(errors.length > 0) {
                    json(errors, 400);
                    return;
                }
                
                this.repository.update(obj, function() {
                    obj._id = id;

                    json(obj);                    
                });
                
                return;
            } else {
                json({}, 400);
                return;
            }
        }

        obj._id = idGenerator.create();
        
        this.repository.update(obj, function() {
        
            obj._id = idGenerator.encrypt(obj._id);
        
            json(obj);
        });
    }
};

module.exports = DataController;