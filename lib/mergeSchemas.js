var _   = require('underscore'),
    fs  = require('fs'),
    path = require('path'),
    config  = require('./config');

module.exports = function(paths, contents) {
  var schema, addedSubSchema = false;

  function itterate(obj, parentKey, parentObj) {

    _.each(obj, function(val, key) {
      
      if(key.match(/\$ref/)) {
        var filePath = config.schemas + parentObj[parentKey][key]; 
        
        addedSubSchema = true;

        if(path.existsSync(filePath)) {

          parentObj[parentKey] = JSON.parse(fs.readFileSync(filePath, 'binary'));

        }
        
      }

      if(typeof val === 'object') {
        itterate(val, key, obj);
      }

    });

    return obj;
  }

  contents.forEach(function(val, key) {
    
    schema = JSON.parse(val);

    contents[key] = itterate(schema);

  });
  
  return contents;
};