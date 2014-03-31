'use strict';

var rightClick = require('rightClick'),
    fs = require('fs'),
    emitter = require('events').EventEmitter;

module.exports = function (config) {
  var emit = new emitter();

  fs.mkdir(config.target.path, function (err) {

    rightClick('./')
      .copy(config.assets)
      .paste(config.target.path, true);

      emit.emit('done');
  });

  return emit;
};
