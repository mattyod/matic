/*
  
    build.js

    Accepts:  config  - object, the config data
              files   - object, the files object generated in schema.js

    Creates a set of HTML files based on the json schemas and template
    files within the files object

*/

var fs  = require('fs');

module.exports = function (config, files) {

  // Import the template language
  var template = require(config.template.lib);

  // Pre compile the template
  var compiled = template.compile(files.templates.contents[0], {
    filename: config.template.path
  });

  // If the target folder doesn't exist already, create one.
  if (!fs.existsSync(config.target)) {

    fs.mkdirSync(config.target);

  }

  // For each schema that has been have loaded
  files.schemas.contents.forEach(function (file, key) {

    // Generate a html file name from the schema name.
    var htmlName = files.schemas.fileNames[key].split(/\./)[0] + '.html';

    // Create a file with the generated name and populate by passing the
    // schema contents through the previously compiled template.
    fs.writeFileSync(config.target + htmlName, compiled(file));

  });

};