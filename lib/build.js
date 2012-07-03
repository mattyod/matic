/*
  
    build.js

    Accepts:  files   - object, the files object generated in schema.js

    Creates a set of HTML files based on the json schemas and template
    files within the files object

*/

var fs        = require('fs'),
    path      = require('path'),
    config    = require('./config'),
    template  = require(config.template.lib);

module.exports = function(files) {

  var compiled = template.compile(files.templates.contents[0], {
    filename: config.template.path
  });

  if(!path.existsSync(config.target)) {

    fs.mkdirSync(config.target);

  }

  files.schemas.contents.forEach(function(file, key) {

    var htmlName = files.schemas.fileNames[key].split(/\./)[0] + '.html';

    fs.writeFileSync(config.target + htmlName, compiled(file));

  });

  process.stdout.write('\nBOOM!!!\n\n');

};