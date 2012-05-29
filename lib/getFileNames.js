/*

	getFileNames.js

	Accepts:  source  	- string, the folder to look in, required
						suffix  	- a file suffix to filter against, optional
s
	Returns:  fileNames - an array of found files

*/

var fs      = require('fs'),
		_       = require('underscore'),
    config  = require('./config');

module.exports = function(folder, suffix) {

  var fileNames = fs.readdirSync(config[folder]);

  if(suffix)
   
    fileNames = _.filter(fileNames, function(file) {

    // Return only files that match the desired suffix
    return _.last(file.split(/\./)).match(suffix);

  });

  return fileNames; 
ss
};