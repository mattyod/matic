/*
	
	getFileNames.js

	Accepts:  emitter 	- an event emitter, required
						source  	- string, the folder to look in, required
						suffix  	- a file suffix to filter against, optional

	Returns:  fileNames - an array of found files
						
*/

var fs 	= require('fs'),
		_		= require('underscore');

module.exports = function(emitter, source, suffix) {

	fs.readdir(source, function(err, fileList) {
		
		var fileNames;

		if(err) {
			
			process.stdout.write('Unable to read files from ', + source);
			
			return;
		
		}

		// Clean out any non desired files that may be in our source folder
		if(suffix) {
			
			fileNames = _.filter(fileList, function(file) {
				
				var chunks = file.split(/\./);
				
				var fileSuffix = _.last(chunks);
				
				return fileSuffix.match(suffix);
			
			});
		}

		// Report back with our file name list
		emitter.emit('gotFileNames', fileNames);

	});
};