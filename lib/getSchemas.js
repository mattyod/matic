/*
	
	getSchemas.js

	Return an array of schema files from the source folder

*/

var fs			= require('fs'),
		path		= require('path'),
		Events	= require('events').EventEmitter;

module.exports = function(emitter, source) {
	
	var schemas = [],
			steps 	= new Events();

	steps.on('gotFileNames', function(fileNames) {
		getFiles(fileNames);
	});

	steps.on('gotFiles', function(files) {
		emitter.emit('schemas', schemas);
	});

	var getFiles = function(files) {

		files.forEach(function(file) {

			fs.readFile(source + file, 'binary', function(err, content) {
			
				if(err) {
					console.log('Error reading file: ' + source + file);
				}

				schemas.push(JSON.parse(content));

				// Check if we are done
				if(schemas.length === files.length) {
					steps.emit('gotFiles');
				}
				
			});
		});
	};


	fs.readdir(source, function(err, files) {

		if(err) {
			console.log('Sorry no files found in ', + source);
			return;
		}

		steps.emit('gotFileNames', files);

	});

};