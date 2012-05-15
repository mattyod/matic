/*
	
	getFileNames.js

*/

var fs = require('fs');

module.exports = function(emitter, source, suffix) {

	fs.readdir(source, function(err, fileNames) {

		if(err) {
			
			console.log('Unable to read files from ', + source);
			
			return;
		
		}

		emitter.emit('gotFileNames', fileNames);

	});
};