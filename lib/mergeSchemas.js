var _   = require('underscore'),
    fs  = require('fs'),
    path = require('path'),
    config  = require('./config');

module.exports = function(paths, contents) {

  function itterate(obj, parentKey, parentObj) {

    _.each(obj, function(val, key) {
      
      if(key.match(/\$ref/)) {
        
        var filePath = config.schemas + parentObj[parentKey][key]; 

        if(path.existsSync(filePath)) {

          return parentObj[parentKey] = itterate(JSON.parse(fs.readFileSync(filePath, 'binary')), parentKey, parentObj);
          
        }
        
      } 

      if (typeof val === 'object') {

        itterate(val, key, obj);
      
      }

    });

    return obj;
  
  }

  contents.forEach(function(val, key) {

    contents[key] = itterate(JSON.parse(val));

  });

  return contents;

};