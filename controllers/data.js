function DataController(idGenerator, repository) {
    this.idGenerator = idGenerator;
    this.repository = repository;
}

DataController.prototype = {
    get: function(id, json) {
        var obj;
        
        if(id) {
            var decodedId = this.idGenerator.get(id);
            
            if(decodedId) {
                obj = this.repository.get(decodedId);
                
                if(obj) {
                    obj.id = id;
                    
                    json(obj);
                    return;
                } else {
                    json({}, 404);
                    return;
                }
            } else {
                json({}, 403);
                return;
            }
        }
        
        json({});
    },
    update: function(obj, json) {
        var id = obj.id;
        
        if(id) {
            var decodedId = this.idGenerator.get(id);
            
            if(decodedId) {
                obj.id = decodedId;
                
                this.repository.update(obj);
        
                obj.id = id;
                
                json(obj);
                return;
            } else {
                json({}, 403);
                return;
            }
        }

        obj.id = this.idGenerator.create();
        
        this.repository.update(obj);
        
        obj.id = this.idGenerator.encode(obj.id);
        
        json(obj);
    }
};

module.exports = DataController;