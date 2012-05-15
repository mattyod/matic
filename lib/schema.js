// Requirements that just run
require('./args');

// Requirements we use internally
var config				= require('./config'),
		getFileNames	= require('./getFileNames'),
		//getSchemas		= require('./getSchemas'),
		Events 			=	require('events').EventEmitter;

module.exports = (function() {
	var steps = new Events();

	steps.on('gotFileNames', function(fileNames) {
		console.log('fileNames: ', fileNames);
	});

	steps.on('schemas', function(schemas) {
		console.log('got Schemas: ', schemas);
	});

	getFileNames(steps, config.source, 'json');
	//getSchemas(tasks, config.source);
	
})();