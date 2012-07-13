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
          // TODO: Should our sub schemas follow this pattern or just be keyless objects?
          var subSchema = JSON.parse(fs.readFileSync(filePath, 'binary'))[parentKey];

          // Return a new itterator into our sub schema and bind that to the parents key
          return parentObj[parentKey] = itterate(subSchema, parentKey, parentObj);
          
        }
        
      } 

      // If we encounter a ew object
      if(typeof val === 'object') {

        // Itterate down into that
        itterate(val, key, obj);
      
      }

    });

    return obj;
  
  }

  contents.forEach(function(val, key) {

    // For each schema we have mapped into our contents we will itterate down into
    // it and look for any $ref keys that will point to our sub schemas
    contents[key] = itterate(JSON.parse(val));

  });

  return contents;

};