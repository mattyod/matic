'use strict';

var _ = require('underscore'),
    path = require('path');

module.exports = function (config) {
  var index = {
    files: {},
    incrementHeader: function (tags) {
      var number = (parseInt(tags[0].match(/[0-9]/), 10) + 1);
      tags[0] = '<h' + number + '>';
      tags[1] = '</h' + number + '>';
      return tags;
    }
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
  }

  itterate(config.files, '', index.files);

  return index;
}
