// Tested module
var rmdirSyncRec = require('../lib/rmdirSyncRec');

// Helper modules
var path  = require('path'),
    fs    = require('fs');

// Path to the folder to be deleted.
var testFolder = path.dirname() + path.sep + 'tests/testFiles/deleteMe';

// Path to a file to be placed within the testFolder.
var testFile = testFolder + path.sep + 'deleteThisFile.txt';

// Path to a sub folder within the testFolder.
var testSubFolder = testFolder + path.sep + 'subFolder';

// Path to a file to be places within the sub folder.
var testSubFile = testSubFolder + path.sep + 'deleteThisToo.txt';

module.exports = {
  
  setUp: function(callback) {

    // Create a test folder that will be deleted.
    fs.mkdirSync(testFolder);

    // Add a file to it
    fs.writeFileSync(testFile, 'Some text');

    // Add a sub folder to it
    fs.mkdirSync(testSubFolder);

    // Add a file to that
    fs.writeFileSync(testSubFile, 'Some text');

    callback();

  },

  tearDown: function(callback) {

    callback(); 

  },

  rmdirRecSync: function(test) {
    test.expect(4);

    // Remove the files and folders created in set up.
    rmdirSyncRec(testFolder);

    test.equal(fs.existsSync(testSubFile), false,
      'Test sub file is deleted');

    test.equal(fs.existsSync(testSubFolder), false,
      'Test sub folder is deleted');

    test.equal(fs.existsSync(testFile), false,
      'Test file is deleted');

    test.equal(fs.existsSync(testFolder), false,
      'Test folder is deleted');

    test.done();

  }

};