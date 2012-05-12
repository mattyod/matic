/*
	getSchemas.js

	Return an array of schema files from the source folder
*/
var fs 			= require('fs'),
		path 		= require('path'),
		events 	= require('events').EventEmitter;

module.exports = function(source) {
	console.log('getting schemas from: ' + source);
	
	var schemas = [];

	var getFiles = function(files) {
		files.forEach(function(file) {
			fs.readFile(source + file, 'binary', function(err, content) {
				
				if(err) {
					console.log('Error reading file: ' + source + file);
				}

				schemas.push(JSON.parse(content));

				// Check if we are done
				if(schemas.length === files.length) {
					finished.emit('done');
				}
			})
		});
	};

	var getFileNames = function() {
		fs.readdir(source, function(err, files) {
			if(err) {
				console.log('Sorry no files found in ', + source);
				return;
			}

			console.log('found: ' + files);
			getFiles(files);
		});
	};
	var finished = new events();
	
	finished.on('done', function() {
		return schemas;
	});

	getFileNames();

};