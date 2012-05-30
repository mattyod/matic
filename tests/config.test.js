// Tested module
var config = require('../lib/config');

module.exports = {
	config: function(test) {
		
    test.expect(5);

		test.ok(config.source);
		test.ok(config.target);
    test.ok(config.schemas);
    test.ok(config.templates);
    test.ok(config.templateLib);

		test.done();
	
  }
};