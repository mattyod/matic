'use strict';

var rightClick = require('rightClick'),
    fs = require('fs');

module.exports = function (config) {

  fs.mkdir(config.target, function (err) {

    rightClick('./')
      .copy(config.assets)
      .paste(config.target, true);
  });

  return true;
};
