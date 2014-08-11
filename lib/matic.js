'use strict';

var rightClick = require('rightclick'),
    fs = require('fs'),
    EventEmitter = require('events').EventEmitter,
    merge = require('./merge'),
    build = require('./build');

module.exports = function (config) {
  var emitter = new EventEmitter(),
      files = [config.templates.path, config.schemas.path],
      suffix = [config.schemas.suffix, config.templates.suffix];

  fs.mkdir(config.target.path, function () {

    rightClick('./', 'utf8')
      .copy(files, suffix)
      .tap(merge, config.schemas.indent)
      .tap(build, config)
      .paste(config.target.path, true);

    rightClick('./')
      .copy(config.assets)
      .paste(config.target.path, true);

    emitter.emit('done');
  });

  return emitter;
};
