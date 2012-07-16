// Tested module
var extend = require('../bin/extend.js');

// Our expected extended object
var testCase = {
  "test": "User mock config",
  "extra": "Extra user attribute"
}

module.exports = {
  setUp: function(callback) {
    // Create a mocked config object
    this.config = {
      "test": "simple mock config"
    };

    // Store the process invokation path
    this.oldProcessPath = process.env.PWD;

    // Adjust the process invokation path to point into our test folder temporarily
    process.env.PWD += '/tests/testFiles';

    callback();

  },
  tearDown: function(callback) {
    
    // Restore the process invokation path
    process.env.PWD = this.oldProcessPath;

    callback();

  },
  extend: function(test) {
    
    test.expect(1);

    var extended = extend(this.config);

    test.deepEqual(extended, testCase);
    
    test.done();

  }
};