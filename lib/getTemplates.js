/*
	getTemplates.js

	Return an array of template files from the source folder
*/
var	fs			= require('fs'),
		path		= require('path'),
		events	= require('events').EventEmitter;

module.exports = function(emitter, source) {
	fs.readFile(source + 'default.jade', 'binary', function(err, file) {
		if(err) {
			console.log(err);
		}

		console.log('got template: ', file);
		emitter.emit('templates', [file]);
	});
};