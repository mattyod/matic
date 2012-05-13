// Requirements that just run
require('./args');

// Requirements we use internally
var config			= require('./config'),
		getSchemas	= require('./getSchemas'),
		Events			= require('events').EventEmitter;

module.exports = (function() {
	var tasks = new Events();

	tasks.on('schemas', function(schemas) {
		console.log('got Schemas: ', schemas);
	});

	getSchemas(tasks, config.source);
	
})();