/*
	
	args.js

	Check for any arguments passed with the call to schema and
	route them accordingly
	
*/

module.exports = (function() {

	// Capture any arguments passed to shcema
	var args = process.argv.slice(2);

	if(args.length) {
		switch(args[0]) {
			case '--help':
			case '-help':
			case '-h':
			case 'help': 
				require('./args/help');
				break;
			case '--version':
			case '-version':
			case '-v':
			case 'version':
				require('./args/version');
				break;
			default:
				process.stdout.write('Unknown argument, try schema help');
		}
	}

})();