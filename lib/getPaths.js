/*

	getFileNames.js

	Accepts:  emitter 	- an event emitter, required
						source  	- string, the folder to look in, required
						suffix  	- a file suffix to filter against, optional

	Returns:  fileNames - an array of found files

*/

var fs      = require('fs'),
		_       = require('underscore'),
    config  = require('./config');

    var pathy = require('path');

module.exports = function(emitter, folder, suffix) {
  
	fs.readdir(config[folder], function(err, fileList) {

		var fileNames;

		if(err) {
      process.stdout.write('err: ', err);
			process.stdout.write('Unable to read files from ', config[path]);

			return;

		}

		// Clean out any references to non requested files that may be in our source folder
		if(suffix) {

			fileNames = _.filter(fileList, function(file) {

				// Return only files that match the desired suffix
				return _.last(file.split(/\./)).match(suffix);

			});
		} else {

			fileNames = fileList;
		
		}

		// Report back with our file name list
		emitter.emit('gotPaths', folder, fileNames);

	});
};