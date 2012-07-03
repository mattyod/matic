// Self invoking requirements
require('./args');

// Requirements we use internally
var config        = require('./config'),
    template      = require('./config').template,
		getFileNames  = require('./getFileNames'),
		getFiles      = require('./getFiles')
    build         = require('./build'),
    mergeSchemas  = require('./mergeSchemas');

module.exports = (function() {

  var files = {
    schemas: {
      fileNames: [],
      contents: []
    },
    templates: {
      fileNames: [template.file + '.' + template.lib],
      contents: []
    }
  };

  // Get paths for schemas
	files.schemas.fileNames = getFileNames('schemas', 'json');

  // Get the file contents for schemas and templates
  files.schemas.contents = getFiles(config.schemas, files.schemas.fileNames);
  files.templates.contents = getFiles(template.path, files.templates.fileNames);

  // Include any lined schemas
  files.schemas.contents = mergeSchemas(files.schemas.contents)

  // Generate HTML from the schema's and templates
  build(files);

})();