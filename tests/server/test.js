var chai = require('chai');
var controller = require('../../controllers/index');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('Index Controller', function() {
    var res;

    before(function() {
      res = {
        render: sinon.spy()
      };

    });

    it('should render index template', function() {
      controller.index(null, res);
      res.render.should.have.been.calledWith('index');
    });

    it('should render hello template', function() {
      controller.test(null, res);
      res.render.should.have.been.calledWith('hello');
    });
});
