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
      // Add as many schemas as you like and they wil all get passed through
      // the default template
      fileNames: [],
      // This is where we store the contents of the schema files we have read.
      contents: []
    },

    templates: {
      // We only expect one template file and that will be default
      // We let the template language handle sub templates and other trouble....
      fileNames: [template.file + '.' + template.lib],
      // The actual contents of these template files go here...
      contents: []
    }

  };

  // Get paths for schemas
	files.schemas.fileNames = getFileNames('schemas', 'json');

  // Get the file contents for schemas and templates
  files.schemas.contents = getFiles(config.schemas, files.schemas.fileNames);
  files.templates.contents = getFiles(template.path, files.templates.fileNames);

  // Include any linked schemas
  files.schemas.contents = mergeSchemas(files.schemas.contents)

  // Generate HTML from the schema's and templates
  build(files);

})();