function DataController(idGenerator, repository) {
    this.idGenerator = idGenerator;
    this.repository = repository;
}

DataController.prototype = {
    get: function(id, json) {
        var obj;
        
        if(id) {
            var decodedId = this.idGenerator.get(id);
            
            if(id) {
                obj = this.repository.get(decodedId);
                
                if(obj) {
                    obj.id = id;
                    
                    json(obj);
                    return;
                }
            } else {
                json({}, 404);
                return;
            }
        }
        
        if(!obj) {
            json({});
        }
    },
    update: function(obj, send) {
        var id = this.idGenerator.create();
        
        obj.id = id;
        
        this.repository.update(obj);
    }
};

module.exports = DataController;