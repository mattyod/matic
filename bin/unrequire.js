/*
	
	Remove file from the require cache so that it can be required again within
	unit tests

	Accepts: mod - the name of the module to be cleared from the require cache
	
*/
var path = require('path');

module.exports = function(mod) {

  delete(require.cache[process.cwd() + path.sep + mod + '.js']);

};