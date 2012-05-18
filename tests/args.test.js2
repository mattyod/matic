var unrequire = require('../lib/unrequire');

module.exports = {
	setUp: function(callback) {
		
		// Store a copy of stdout.write
		this.oldStdout = process.stdout.write;

		// Suppress stdout.write while we run the tests
		process.stdout.write = (function(write) {
			return function(/* string, encoding, fd */) {
				return; 
    	}
		})(process.stdout.write);
		
		// Store path to our arguments modules for require.cache assertions
		this.path = __dirname.replace(/tests/, 'lib/args');

		callback();
	},
	tearDown: function(callback) {
		
		// Restore stdout.write
		process.stdout.write = this.oldStdout;
		
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
			require('../lib/args');
			
			// help.js does now exist in the require cache
			test.ok(require.cache[self.path + '/help.js']);
			
			// Remove args.js from the require cache
			unrequire('args');
	
			// Remove help.js from the require.cache
			unrequire('args/help');

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
			require('../lib/args');
			
			// version.js does now exist in the require cache
			test.ok(require.cache[self.path + '/version.js']);

			// Remove args.js from the require cache
			unrequire('args');
	
			// Remove version.js from the require.cache
			unrequire('args/version');
		
		});
		
		test.done();
	}	
};