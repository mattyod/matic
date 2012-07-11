/*
  
    build.js

    Accepts:  config  - object, the config data
              files   - object, the files object generated in schema.js

    Creates a set of HTML files based on the json schemas and template
    files within the files object

*/

var fs        = require('fs'),
    path      = require('path');

module.exports = function(config, files) {

  // Import our template language
  var template = require(config.template.lib);

  // Pre compile our template
  var compiled = template.compile(files.templates.contents[0], {
    filename: config.template.path
  });

  // If we don't already have a target folder create one
  if(!path.existsSync(config.target)) {

    fs.mkdirSync(config.target);

  }

  // For each schema that we have loaded
  files.schemas.contents.forEach(function(file, key) {

    // Generate a html file name from the schema name
    var htmlName = files.schemas.fileNames[key].split(/\./)[0] + '.html';

    // Create a file with our generated name and populate by passing our
    // schema contents through our previously compiled template
    fs.writeFileSync(config.target + htmlName, compiled(file));

  });

  // TODO: Generate a proper completion message & move this to the binary file
  process.stdout.write('\nBOOM!!!\n\n');

};