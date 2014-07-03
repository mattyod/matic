'use strict';

var fs = require('fs'),
    log = require('col');

module.exports = function () {
  var files, config;

  files = fs.readdirSync(process.cwd());

  if (files.indexOf('.maticrc') !== -1) {
    config = '.maticrc';
  } else {
    config = 'config.json';
    log.warn('Use of config.json is deprecated. Please rename it to ".maticrc"');
  }

  return config;
}
