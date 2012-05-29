// Requirements that just run
require('./args');

// Requirements we use internally
var config        = require('./config'),
		getFileNames  = require('./getFileNames'),
		getFiles      = require('./getFiles')
    build         = require('./build'),
		Events        =	require('events').EventEmitter;

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

	steps.on('gotPaths', function(path, fileNames) {
		
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

  // Get paths for schemas and templates
	files.schemas.paths = getFileNames('schemas', 'json');
  files.templates.paths = getFileNames('templates');
	

  // Get the file contents for schemas and templates
  files.schemas.contents = getFiles('schemas', files.schemas.paths);
  files.templates.contents = getFiles('templates', files.templates.paths);

  // Generate HTML from the schema's and templates
  build(files);

})();