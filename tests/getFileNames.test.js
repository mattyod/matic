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

      fs.writeFileSync('./testFiles/test1.json', '{"test": "file 1"}');
      fs.writeFileSync('./testFiles/test2.json', '{"test": "file 2"}');
      fs.writeFileSync('./testFiles/test3.json', '{"test": "file 3"}');
      fs.writeFileSync('./testFiles/test4.txt', 'test file that should not be read');

      callback();

    });

  },

  tearDown: function(callback) {

    // Tidy up
    rmdirSyncRec('testFiles');

    callback();

  },

  getSpecific: function(test) {

    test.expect(4);

    // Call getFileNames with a suffix filter that exists
    var fileNames = getFileNames(config, 'testFiles', 'json');

    test.equal(fileNames.length, 3,
      '4 file names are returned in an array');

    test.ok(fileNames.indexOf('test1.json') >=0,
      'Test1 is in the filenames array');

    test.ok(fileNames.indexOf('test2.json') >=0,
      'Test2 is in the filenames array');

    test.ok(fileNames.indexOf('test3.json') >=0,
      'Test3 is in the filenames array');

    test.done();

  },

  getAll: function(test) {

    test.expect(5);

    // Call getFileNames without a file suffix filter
    var fileNames = getFileNames(config, 'testFiles');

    test.equal(fileNames.length, 4,
      '4 file names are returned in an array');

    test.ok(fileNames.indexOf('test1.json') >=0,
      'Test1 is in the filenames array');

    test.ok(fileNames.indexOf('test2.json') >=0,
      'Test2 is in the filenames array');

    test.ok(fileNames.indexOf('test3.json') >=0,
      'Test3 is in the filenames array');

    test.ok(fileNames.indexOf('test4.txt') >=0,
      'Test4 is in the filenames array');

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