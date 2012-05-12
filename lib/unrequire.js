/*
	Remove file from the require cache so that it can
	be required again within unit tests
*/

module.exports = function(mod) {
	delete(require.cache[__dirname + '/' + mod + '.js']);
};