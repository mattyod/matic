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

  // Test building from a single specified template file
  buildSingleTemplate: function(test) {

    test.expect(6);

    test.ok(!fs.existsSync(this.config.target),
      'Target folder does not yet exist');

    // Run the build module.
    build(this.config, this.files);

    test.ok(fs.existsSync(this.config.target),
      'Target folder is created');

    test.ok(fs.existsSync(this.config.target + 'one.html'),
      'First html file generated from template');

    test.equal(fs.readFileSync(this.config.target + 'one.html', 'binary'),
      '<h1>test file one</h1>',
      'one.html generated as expected');

    test.ok(fs.existsSync(this.config.target + 'two.html'),
      'Second html file generated from template');

    test.equal(fs.readFileSync(this.config.target + 'two.html', 'binary'),
      '<h1>test file two</h1>',
      'one.html generated as expected');

    test.done();

  },

  // Test building from multiple specified template files
  buildMultipleTemplate: function (test) {

    test.expect(6);

    // Extend the templates config to include two template files
    this.files.templates = {
      fileNames: ['one.jade', 'two.jade'],
      contents: ["h1 #{name}", "h2 #{name}"]
    }

    test.ok(!fs.existsSync(this.config.target),
      'Target folder does not yet exist');

    // Run the build module.
    build(this.config, this.files);

    test.ok(fs.existsSync(this.config.target),
      'Target folder is created');

    test.ok(fs.existsSync(this.config.target + 'one.html'),
      'First html file generated from template');

    test.equal(fs.readFileSync(this.config.target + 'one.html', 'binary'),
      '<h1>test file one</h1>',
      'one.html generated as expected');

    test.ok(fs.existsSync(this.config.target + 'two.html'),
      'Second html file generated from template');

    test.equal(fs.readFileSync(this.config.target + 'two.html', 'binary'),
      '<h2>test file two</h2>',
      'two.html generated as expected');

    test.done();
  }
  
};