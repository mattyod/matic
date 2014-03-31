'use strict';

var rightClick = require('rightClick'),
    fs = require('fs');

module.exports = function (config) {

  fs.mkdir(config.target.path, function (err) {

    rightClick('./')
      .copy(config.assets)
      .paste(config.target.path, true);
  });

  return true;
};
