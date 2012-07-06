// Tested modules
var mergeSchemas = require('../lib/mergeSchemas');

// Helper modules
var fs      = require('fs'),
    config  = require('../lib/config');

module.exports = {
  
  setUp: function(callback) {

    config.schemas = './tests/testSchemas/'

    this.expectedResult = JSON.parse(fs.readFileSync('tests/testSchemas/expectedTestResultsSchema.json', 'binary'));

    this.schema = [fs.readFileSync('tests/testSchemas/testSchema.json', 'binary')];

    callback();
  },

  tearDown: function(callback) {
    callback();
  },

  mergeSchema: function(test) {
    
    test.expect(1);

    var mergedSchema = mergeSchemas(this.schema);

    test.deepEqual(mergedSchema[0], this.expectedResult);

    test.done();

  }
}