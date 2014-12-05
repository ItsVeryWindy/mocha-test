function toTitleCase(str)
{
    // insert a space before all caps
    return str.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })
}

function story(str) {
    var container = function(inner) {
        describe('\n\x1b[33m    Scenario: ' + str, function() {
            inner();
        });
    };
    
    return {
        given: given.bind(null, container)
    };
}


function given(parent, func) {
    if(func) {
        var name = toTitleCase(func.name);
        var args = createArguments(arguments, 2);

        var container = function(inner) {
            parent(function() {
                describe('\x1b[35mGiven ' + name + args.argStr, function() {
                    beforeEach(function() {
                        func.apply(null, args.args);
                    });

                    inner();            
                });
            });
        };
    } else {
        var container = function(inner) {
            parent(inner);
        };
    }
    
    return {
        and: and.bind(null, container),
        when: when.bind(null, container)
    };
}

function when(parent, func) {
    var name = toTitleCase(func.name);
    var args = createArguments(arguments, 2);
    
    var container = function(inner) {
        parent(function() {
            describe('\x1b[35mWhen ' + name + args.argStr, function() {
                beforeEach(function() {
                    func.apply(null, args.args);
                });
            
                inner();    
            });
        });
    };
    
    return {
        then: then.bind(null, container),
        and: and.bind(null, container)
    };
}

function then(parent, func) {
    var name = toTitleCase(func.name);
    
    var thens = [];
    
    var args = createArguments(arguments, 2);
    
    thens.push(function() {
        it('Then ' + name + args.argStr, function() {
            func.apply(null, args.args);           
        });       
    });
    
    var container = function() {
        parent(function() {
            for(var i = 0; i < thens.length; i++) {
                thens[i]();
            }
        });
    };
    
    return {
        and: andArray.bind(null, container, thens),
        execute: execute.bind(null, container)
    };
}

function createArguments(args, start) {
    var argStr = '';
    var argArray = [];
    
    if(args.length > start) {
        argStr = [];
        for(var i = start; i < args.length; i++) {
            var arg = args[i];
            if(isObjLiteral(arg)) {
                argStr.push(JSON.stringify(arg));
            } else {
                argStr.push(arg);
            }
            
            argArray.push(arg);
        }
        
        argStr = ' (' + argStr.join(', ') + ')';
    }
    
    return {
        args: argArray,
        argStr: argStr
    };
}

function execute(parent) {
    parent();
}

function and(parent, func) {
    var name = toTitleCase(func.name);
    var args = createArguments(arguments, 2);
    
    var container = function(inner) {
        parent(function() {
            describe('\x1b[35mand ' + name + args.argStr, function() {
                beforeEach(function() {
                    func.apply(null, args.args);
                });
            
                inner();
            });
        });
    };
    
    return {
        and: and.bind(null, container),
        when: when.bind(null, container)
    };
}

function andArray(container, thens, func) {
    var name = toTitleCase(func.name);
    
    var args = createArguments(arguments, 3);
    
    thens.push(function() {
        it('and ' + name + args.argStr, function() {
            func.apply(null, args.args);           
        });       
    });
    
    return {
        and: andArray.bind(null, container, thens),
        execute: execute.bind(null, container)
    };
}

function isObjLiteral(_obj) {
  var _test  = _obj;
  return (  typeof _obj !== 'object' || _obj === null ?
              false :  
              (
                (function () {
                  while (!false) {
                    if (  Object.getPrototypeOf( _test = Object.getPrototypeOf(_test)  ) === null) {
                      break;
                    }      
                  }
                  return Object.getPrototypeOf(_obj) === _test;
                })()
              )
          );
}

module.exports = function() {
    var chai = require('chai');
    var sinon = require('sinon');
    var sinonChai = require("sinon-chai");
    
    chai.should();
    chai.use(sinonChai);
    
    var controller = function(name) {
        return require('../../controllers/' + name);
    };
    
    return {
        controller: controller,
        sinon: sinon,
        story: story
    };
};