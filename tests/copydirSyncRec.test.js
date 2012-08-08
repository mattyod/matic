// Tested module
var copydirSyncRec = require('../lib/copydirSyncRec');

// Helper modules
var path          = require('path'),
    fs            = require('fs'),
    rmdirSyncRec  = require('../lib/rmdirSyncRec');

// Path to the folder to be copied.
var testFolder = path.dirname() + path.sep + 'tests/testFiles/copyMe';

// Path to a file to be placed within the testFolder.
var testFile = testFolder + path.sep + 'copyThisFile.txt';

// Path to a sub folder within the testFolder.
var testSubFolder = testFolder + path.sep + 'subFolder';

// Path to a file to be placed within the sub folder.
var testSubFile = testSubFolder + path.sep + 'copyThisToo.txt';

// Path to a target folder that the test folder and it's contents will be copied into.
var targetFolder = path.dirname() + path.sep + 'tests/testFiles/copyToHere';

// Path to the copy of testFile
var targetFile = targetFolder + path.sep + 'copyThisFile.txt';

// Path to a copy of the sub folder within the testFolder.
var targetSubFolder = targetFolder + path.sep + 'subFolder';

// Path to a file to be copied within the sub folder.
var targetSubFile = targetSubFolder + path.sep + 'copyThisToo.txt';

module.exports = {
  
  setUp: function(callback) {

    // Create a test folder that will be copied.
    fs.mkdirSync(testFolder);

    // Add a file to it.
    fs.writeFileSync(testFile, 'Some text');

    // Add a sub folder to it.
    fs.mkdirSync(testSubFolder);

    // Add a file to that.
    fs.writeFileSync(testSubFile, 'Some text');
    
    callback();

  },

  tearDown: function(callback) {

    // Clean up test folder.
    rmdirSyncRec(testFolder);

    // Clean up newly copied folder.
    rmdirSyncRec(targetFolder);

    callback();

  },

  copydirSyncRec: function(test) {
    
    // Copy test folder to target location.
    copydirSyncRec(testFolder, targetFolder);

    test.equal(fs.existsSync(targetSubFile), true,
      'Test sub file is copied');

    test.equal(fs.existsSync(targetSubFolder), true,
      'Test sub folder is copied');

    test.equal(fs.existsSync(targetFile), true,
      'Test file is copied');

    test.equal(fs.existsSync(targetFolder), true,
      'Test folder is copied');

    test.done();

  }

};