// Requirements that just run
require('./args');

// Requirements we use internally
var config 			= require('./config'),
		getSchemas 	= require('./getSchemas'),
		observe			= require('./observe');

module.exports = (function() {

	observe.add('getSchemas', getSchemas(observe.events, config.source));
	console.log(observe);

	//var schemas = getSchemas(config.source);
	//console.log('got schemas: ', schemas);

	
})();