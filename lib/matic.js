'use strict';

var rightClick = require('rightClick'),
    fs = require('fs'),
    eventEmitter = require('events').EventEmitter,
    merge = require('./merge'),
    render = require('./render');

module.exports = function (config) {
  var emitter = new eventEmitter(),
      files = [config.templates.path, config.schemas.path],
      suffix = [config.schemas.suffix, config.templates.suffix];

  fs.mkdir(config.target.path, function () {

    rightClick('./', 'utf8')
      .copy(files, suffix)
      .tap(merge)
      .tap(render, config)
      .tap(function () {fs.writeFileSync('wow.json', this.clipboard.files.schemas['example.json'])})
      .paste(config.target.path, true);

    rightClick('./')
      .copy(config.assets)
      .paste(config.target.path, true);

    emitter.emit('done');
  });

  return emitter;
};
