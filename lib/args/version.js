var fs = require('fs');

module.exports = (function() {
	var version = 'schema: v' + 
		JSON.parse(fs.readFileSync('./package.json', 'binary')).version +
		'\n';
	
	process.stdout.write(version);
})();