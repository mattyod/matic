// Tested module
var getFileNames = require('../lib/getFileNames');

// Helper modules
var fs            = require('fs'),
    config        = require('../lib/config')
    rmdirSyncRec  = require('../lib/rmdirSyncRec');

module.exports = {

  setUp: function(callback) {

    config.testFiles = './testFiles';

    fs.mkdir('testFiles', function(err) {

    if(err) {
      
      process.stdout.write('\n"testFiles" folder already exists please delete it and run again.\n');
      
      process.stdout.write('This is probably because teardown failed to run on one of your previous tests.\n');
      
      return;

      }

      fs.writeFileSync('./testFiles/a-test.json', '{"test": "file 1"}');
      fs.writeFileSync('./testFiles/b-test.json', '{"test": "file 2"}');
      fs.writeFileSync('./testFiles/c-test.json', '{"test": "file 3"}');
      fs.writeFileSync('./testFiles/d-test.txt', 'test file that should not be read');

      callback();

    });

  },

  tearDown: function(callback) {

    // Tidy up
    rmdirSyncRec('testFiles');

    callback();

  },

  getSpecific: function(test) {

    test.expect(1);

    // Call getFileNames with a suffix filter that exists
    var fileNames = getFileNames(config, 'testFiles', 'json');

    test.deepEqual(fileNames, [ 'a-test.json', 'b-test.json', 'c-test.json' ],
      'fileNames array is built without .txt file');

    test.done();

  },

  getAll: function(test) {

    test.expect(1);

    // Call getFileNames without a file suffix filter
    var fileNames = getFileNames(config, 'testFiles');

    test.deepEqual(fileNames, [ 'a-test.json', 'b-test.json', 'c-test.json', 'd-test.txt' ],
      'fileNames array is built with all files');

    test.done();

  },

  getNone: function(test) {

    test.expect(1);

    // Call getFileNames with a suffix filter that shouldn't exist or be returned
    var fileNames = getFileNames(config, 'testFiles', '.doc');

    test.deepEqual(fileNames, [],
      'An empty array is returned');

    test.done();

  }
  
};