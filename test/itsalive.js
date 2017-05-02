var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
var should = chai.should();

chai.use(spies);


describe('Testing stuff', function(){
  it('does math accurately', function(){
    expect(2+2).to.equal(4);
  });

  it('should timeout properly', function(done){
    var start = new Date();
    setTimeout(function(){
      var duration = new Date() - start;
      expect(duration).to.be.closeTo(1000, 50);
      done();
    }, 1000);
  });

  it('will invoke a function once per element', function () {
    var arr = ['x', 'y', 'z'];

    function logNth (val, idx) {
      console.log('Logging elem #' + idx + ':', val);
    }

    logNth = chai.spy(logNth);
    arr.forEach(logNth);
    expect(logNth).to.have.been.called.exactly(arr.length);
  });

});

