/* 
  
  Tested module is args/help.js but is self invoking
  so we will only require it when ready

*/


// helpers
var sinon = require('sinon');

module.exports = {
  setUp: function(callback) {
   
    this.write = sinon.stub(process.stdout, "write", function() {
      return;
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
  help: function(test) {
    
    test.expect(2);
//console.log(this.exit);
    require('../lib/args/help');
    
    // Help wrote something to the console
    test.equals(this.write.calledOnce, true);
    
    // Help then called a process exit
    test.equals(this.exit.calledOnce, true);
    
    test.done();
  
  }
};