/*
  
    build.js

    Accepts:  emitter - an event emitter, required
              files   - object, the files object generated in schema.js

    Returns:  htmls   - an array of html file contents,  
*/
var fs      = require('fs'),
    config  = require('./config');

var template = require(config.templateLib);

module.exports = function(emitter, files) {

  var htmls = [];

  var compiled = template.compile(files.templates.contents[0]);

  files.schemas.contents.forEach(function(file, key) {
    htmls.push(compiled(JSON.parse(file)));
    
    fs.mkdir(config.target, function(err) {
      if(err) {
        console.log(err);
        return;
      }

      var htmlName = files.schemas.paths[key].split('.')[0] + '.html';

      fs.writeFile(config.target + htmlName, compiled(JSON.parse(file)), function(err) {
        
        if(err) {
          console.log(err);
        }

      });
    });
    
    
  });

  emitter.emit('built', htmls);
};