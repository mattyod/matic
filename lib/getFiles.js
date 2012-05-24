/*
	
	getFiles.js

	Accepts: 	emitter			- an event emitter, required
						path				- string, files path
						fileNames 	- array, fileNames to get

	Returns: 	files 			- an array of file contents 
*/

var fs      = require('fs'),
    Events  = require('events').EventEmitter
    config  = require('./config');

module.exports = function(emitter, path, fileNames) {

  fileNames.forEach(function(file) {

    fs.readFile(config[path] + file, 'binary', function(err, content) {
      
      var files = [];

      if(err) {
        console.log('Error reading file: ' + config[path] + file);
      }

      files.push(content);

      // Check if we are done
      if(files.length === fileNames.length) {
        emitter.emit('gotFiles', path, files);
      }
      
    });
  });
};