'use strict';

var rightClick = require('rightClick'),
    fs = require('fs'),
    emitter = require('events').EventEmitter,
    merge = require('./merge');

module.exports = function (config) {
  var emit = new emitter();

  fs.mkdir(config.target.path, function () {

    rightClick('./', 'utf8')
      .copy([config.templates.path, config.schemas.path])
      .tap(merge);

    rightClick('./')
      .copy(config.assets)
      .paste(config.target.path, true);

    emit.emit('done');
  });

  return emit;
};
