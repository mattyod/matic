/* 
  
  Tested module is args/version.js but is self invoking
  so we will only require it when ready

*/


// helpers
var sinon = require('sinon'),
    pack  = require('../package.json');

module.exports = {
  setUp: function(callback) {
   
    this.write = sinon.stub(process.stdout, "write", function(string) {
      return string;
    });
    
    this.exit = sinon.stub(process, "exit", function() {
      return;
    });

    callback();

  },
  tearDown: function(callback) {
    
    process.stdout.write.restore();
    
    process.exit.restore();

    callback();
  
  },
  version: function(test) {
    
    test.expect(3);

    require('../bin/args/version');
    
    test.ok(this.write.calledOnce,
      'version wrote something to the console');

    // Get the first (and only) call to process.stdout.write
    var spyCall = this.write.getCall(0)

    test.ok(spyCall.args[0].match(pack.version),
      'version called process.stdout.write with the correct version number');
    
    test.ok(this.exit.calledOnce,
      'version then called a process exit');
    
    test.done();
  
  }
};