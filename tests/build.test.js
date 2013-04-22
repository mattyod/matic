// Tested module
var build = require('../lib/build');

// Helper modules
var sinon         = require('sinon'),
    fs            = require('fs'),
    rmdirSyncRec  = require('../lib/rmdirSyncRec');

module.exports = {

  setUp: function(callback) {

    // Mock config object.
    this.config = {
      suffix: '.html',
      template: {
        lib: 'jade',
        file: 'one',
        path: 'testTemplates'
      },
      target: 'tests/buildTestOutput/'
    };
    
    // Mock files object.
    this.files = {
      templates: {
        fileNames: ['one.jade'],
        contents: ["h1 #{name}"]
      },
      schemas: {
        contents: [{"name": "test file one"}, {"name": "test file two"}],
        fileNames: ['one.test', 'two.test']
      }
    };

    callback();
  
  },

  tearDown: function(callback) {
    
    // Clean up target folder
    rmdirSyncRec(this.config.target);

    callback();

  },

  build: function(test) {

    test.expect(4);

    test.ok(!fs.existsSync(this.config.target),
      'Target folder does not yet exist');

    // Run the build module.
    build(this.config, this.files);

    test.ok(fs.existsSync(this.config.target),
      'Target folder is created');

    test.ok(fs.existsSync(this.config.target + 'one.html'),
      'First html file generated from template');

    test.ok(fs.existsSync(this.config.target + 'two.html'),
      'Second html file generated from template');

    test.done();

  }
  
};