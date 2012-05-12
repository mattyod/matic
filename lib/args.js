module.exports = (function() {

	// Capture any arguments passed to shcema
	var args = process.argv.slice(2);

	args.forEach(function(arg) {

		switch(arg) {
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
				console.log('Unknown argument, try schema help');
		}

	});

})();