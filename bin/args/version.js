var pack 	= require('../../package.json');

module.exports = (function() {
	var version = 'schema: v' + 
		pack.version + '\n';
	
	// Write out the version to the terminal
	process.stdout.write(version);

	// Exit the application with a success code
	process.exit(0);

})();