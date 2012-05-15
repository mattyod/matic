module.exports = (function() {
	var help = 
	'\n' +
	'Schema.js\n' +
	'---------\n\n' +
	'Arguments\n' +
	'---------\n' +
	'  --help, -h, help: All the helps.' +
	'\n\n';

	// Write out help text to the terminal
	process.stdout.write(help);

	// Exit the application with success code
	process.exit(0);
})();