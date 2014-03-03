'use strict';

var _   = require('underscore'),
    fs  = require('fs');

module.exports = function (folder, contents) {

  function itterate(obj, parentKey, parentObj) {

    _.each(obj, function (val, key) {

      if (key.match(/\$ref/)) {

        // The $ref keys value should be a path to the sub schema, get it.
        var filePath = folder + parentObj[parentKey][key];

        // Check path exists
        if (fs.existsSync(filePath)) {

          // Get the subSchema
          var subSchema = JSON.parse(fs.readFileSync(filePath, 'utf8'));

          // Return a new itterator into the sub schema and bind that to the parents key
          return parentObj[parentKey] = itterate(subSchema, parentKey, parentObj);

        }

      }

      // If a new object (but not an array) is encountered.
      if (val !== null && typeof val === 'object' && !val.length) {

        // Itterate down into that
        itterate(val, key, obj);

      }

    });

    return obj;

  }

  contents.forEach(function (val, key) {

    // For each schema that is mapped into the contents itterate down into
    // it and look for any $ref keys that will point to sub schemas
    contents[key] = itterate(JSON.parse(val));

  });

  return contents;

};
