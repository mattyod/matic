'use strict';

var rightClick = require('rightClick'),
    fs = require('fs'),
    eventEmitter = require('events').EventEmitter,
    merge = require('./merge');

module.exports = function (config) {
  var emitter = new eventEmitter();

  fs.mkdir(config.target.path, function () {

    rightClick('./', 'utf8')
      .copy([config.templates.path, config.schemas.path], config.schemas.suffix)
      .tap(merge)
      .tap(function () {fs.writeFileSync('wow.json', JSON.stringify(this.clipboard.files.schemas['example.json']))});

    rightClick('./')
      .copy(config.assets)
      .paste(config.target.path, true);

    emitter.emit('done');
  });

  return emitter;
};
