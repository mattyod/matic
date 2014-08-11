'use strict';

var _ = require('underscore'),
    path = require('path');

module.exports = function (parentObj, subSchema, schema) {
  var fragments = _.without(subSchema.split(/\/|#/), ''),
      obj = parentObj,
      dir = _.without(path.dirname(schema).split(/\/|#/), '');

  while (fragments[0] === '.' || fragments[0] === '..') {
    fragments.shift();
    if (fragments[0] === '..') {
      dir.pop();
    }
  }

  if (dir[0] === '.') {
    dir.shift();
  }

  fragments = dir.concat(fragments);

  _.each(fragments, function (fragment) {
    obj = obj[fragment] ? obj[fragment] : false;
  });

  return {
    path: fragments.join('/'),
    obj: JSON.parse(obj)
  };

};
