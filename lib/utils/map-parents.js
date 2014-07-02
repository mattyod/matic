'use strict';

var _ = require('underscore');

module.exports = function (object, mappedKey) {
  var mappings = {};

  var itterate = function (obj) {
    _.each(obj, function (val, key) {

      if (key === mappedKey) {
        mappings[val] = obj;
      }

      if (_.isObject(val) && !_.isArray(val)) {
        itterate(obj[key]);
      }

    });
  };

  itterate(object);

  return mappings;

};
