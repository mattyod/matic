'use strict';

var _ = require('underscore');

module.exports = function (parentObj, path) {
  var fragments = _.without(path.split(/\/|#/), ''),
      obj = parentObj;

  _.each(fragments, function (fragment) {

    if (typeof obj[fragment] === 'string') {
      obj[fragment] = JSON.parse(obj[fragment]);
    }

    obj = obj[fragment] ? obj[fragment] : false;
  });

  return obj;
};
