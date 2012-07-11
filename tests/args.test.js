var unrequire = require('../bin/unrequire'),
    sinon     = require('sinon');

    var _ = require('underscore');

module.exports = {
  setUp: function(callback) {

    sinon.stub(process.stdout, "write", function() {
      return;
    });

    sinon.stub(process, "exit", function() {
      return;
    });

    // Store path to our arguments modules for require.cache assertions
    this.path = __dirname.replace(/tests/, 'bin/args');

    // Remove args.js from the require cache
    unrequire('bin/args');
  
    // Remove help.js from the require.cache
    unrequire('bin/args/help');

    // Remove version.js from the require.cache
    unrequire('bin/args/version');

    callback();

  },
  tearDown: function(callback) {

    process.stdout.write.restore();

    process.exit.restore();

    callback();

  },
  help: function(test) {
    var self = this;

    test.expect(8);

    ['--help', '-help', '-h', 'help'].forEach(function(arg) {

      // help.js has not yet been required
      test.strictEqual(require.cache[self.path + '/help.js'], undefined);

      // Push argument into arguments array - as if user had entered ~ schema help
      process.argv[2] = arg;

      // Call args.js
      require('../bin/args');

      // help.js does now exist in the require cache
      test.ok(require.cache[self.path + '/help.js']);

      // Remove args.js from the require cache
      unrequire('bin/args');
  
      // Remove help.js from the require.cache
      unrequire('bin/args/help');

    });

    test.done();
  },
  version: function(test) {
    var self = this;

    test.expect(8);

    ['--version', '-version', '-v', 'version'].forEach(function(arg) {

      // version.js has not yet been required
      test.strictEqual(require.cache[self.path + '/version.js'], undefined);

      // Push argument into arguments array - as if user had entered ~ schema version
      process.argv[2] = arg;

      // Call args.js
      require('../bin/args');

      // version.js does now exist in the require cache
      test.ok(require.cache[self.path + '/version.js']);

      // Remove args.js from the require cache
      unrequire('bin/args');
  
      // Remove version.js from the require.cache
      unrequire('bin/args/version');

    });

    test.done();
  }
};