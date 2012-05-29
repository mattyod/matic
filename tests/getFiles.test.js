// Tested module
var getFiles = require('../lib/getFiles');

// Helper modules
var fs      = require('fs'),
    exec    = require('child_process').exec,
    config  = require('../lib/config');

module.exports = {
  setUp: function(callback) {

    config.testFiles = 'testFiles/';

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
    // TODO: Need to make this deletion cross platform
    // I suppose we could write a big itterator class - but this seems easier
    // console.log(process.platform);
    exec('rm -rf testFiles', function() {
      callback(); 
    });
    
  },
  getFiles: function(test) {
    
    test.expect(1);

    var desiredFiles = [ 'test1.json', 'test2.json', 'test3.json' ];

    var desiredOutput = [ '{"test": "file 1"}', '{"test": "file 2"}', '{"test": "file 3"}' ];

    var files = getFiles('testFiles', desiredFiles);

    test.deepEqual(files, desiredOutput);

    test.done();

  }
};