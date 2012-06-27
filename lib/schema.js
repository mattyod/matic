// Self invoking requirements
require('./args');

// Requirements we use internally
var config        = require('./config'),
		getFileNames  = require('./getFileNames'),
		getFiles      = require('./getFiles')
    build         = require('./build'),
    mergeSchemas  = require('./mergeSchemas');

module.exports = (function() {

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

  // Get paths for schemas and templates
	files.schemas.paths = getFileNames('schemas', 'json');
  files.templates.paths = getFileNames('templates', 'jade');

  // Get the file contents for schemas and templates
  files.schemas.contents = getFiles('schemas', files.schemas.paths);
  files.templates.contents = getFiles('templates', files.templates.paths);

  // Include any lined schemas
  files.schemas.contents = mergeSchemas(files.schemas.paths, files.schemas.contents)

  // Generate HTML from the schema's and templates
  build(files);

})();