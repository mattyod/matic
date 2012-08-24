var _   = require('underscore'),
    fs  = require('fs');

module.exports = function(folder, contents) {

  function itterate(obj, parentKey, parentObj) {

    _.each(obj, function(val, key) {
      
      if(key.match(/\$ref/)) {
        
        // The $ref keys value should be a path to the sub schema, get it.
        var filePath = folder + parentObj[parentKey][key];

        // Check path exists
        if(fs.existsSync(filePath)) {

          // Get the subSchema and assume it has an initial key to match the parent
          // object that is calling it.
          // TODO: Should the sub schemas follow this pattern or just be keyless objects?
          // TODO: It should be a keyless object - change this!
          var subSchema = JSON.parse(fs.readFileSync(filePath, 'binary'))[parentKey];

          // Return a new itterator into the sub schema and bind that to the parents key
          return parentObj[parentKey] = itterate(subSchema, parentKey, parentObj);
          
        }
        
      }

      // If a new object is encountered.
      if(typeof val === 'object') {

        // Itterate down into that
        itterate(val, key, obj);
      
      }

    });

    return obj;
  
  }

  contents.forEach(function(val, key) {

    // For each schema that is mapped into the contents itterate down into
    // it and look for any $ref keys that will point to sub schemas
    contents[key] = itterate(JSON.parse(val));

  });

  return contents;

};