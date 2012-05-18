var config = require('../lib/config');

module.exports = {
	config: function(test) {
		test.expect(2);

		test.ok(config.source);
		test.ok(config.target);

		test.done();
	}
};