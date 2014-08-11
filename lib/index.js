'use strict';

var _ = require('underscore'),
    path = require('path');

module.exports = function (config) {
  var index = {
    files: {}
  };

  var itterate = function (obj, basePath, target, isChild) {
    _.each(obj, function (val, key) {
      var fullPath = path.join(basePath, key);

      if (typeof val === 'string') {
        target[key] = fullPath;
      } else {
        if (config.index[key] || isChild) {
          target[key] = target[key] || {};
          itterate(val, fullPath, target[key], true);
        }
      }
    });
  };

  itterate(this.clipboard.files, '', index.files);

  return index;
};
