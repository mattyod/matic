/*
	
	getFiles.js

	Accepts: 	path				- string, files path
						fileNames 	- array, fileNames to get

	Returns: 	files 			- an array of file contents 

*/

var fs  = require('fs');

module.exports = function(path, fileNames) {
  
  var files = [];

  fileNames.forEach(function(file) {

    files.push(fs.readFileSync(path + file, 'binary'));
  
  });

  return files;

};