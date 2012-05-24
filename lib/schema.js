// Requirements that just run
require('./args');

// Requirements we use internally
var config    = require('./config'),
		getPaths  = require('./getPaths'),
		getFiles  = require('./getFiles')
    build     = require('./build'),
		Events    =	require('events').EventEmitter;

module.exports = (function() {
	var steps = new Events();

  var files = {
    schemas: {
      paths: [],
      contents: []
    },
    templates: {
      paths: [],
      contents: []
    }
  };

	steps.on('gotFileNames', function(path, fileNames) {
		
    // Store the path references
    files[path].paths = fileNames;
		
    // Get the file contents
    getFiles(steps, path, fileNames);
	
  });

	steps.on('gotFiles', function(path, schemas) {
		
    files[path].contents = schemas;

    // If both sets of files (schemas & templates) are returned, build the html
    if(files.schemas.contents.length && files.templates.contents.length) {
      build(steps, files);
    }
    
	});

  steps.on('built', function(htmls) {
    console.log('BOOM!!!!');
  });

	getPaths(steps, 'schemas', 'json');
  getPaths(steps, 'templates');
	
})();