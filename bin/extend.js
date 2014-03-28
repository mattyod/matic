'use strict';

/*

  extend.js

  Checks if the folder from which Matic was invoked contains a config.js file
  If it does we load it in an extend our app config with any different settings
  it may have. This allows the user to over write any default values such as the
  target folder.

  Accepts: config, the config object.

  Returns: config, a possibly extended config object.

*/

var fs    = require('fs'),
    _     = require('underscore'),
    path  = require('path'),
    rightClick = require('rightClick');

module.exports = function (config) {
  var userConfig;

  rightClick(process.cwd(), 'utf8')
    .copy('config.json')
    .tap(function () {
      userConfig = JSON.parse(this.clipboard.files['config.json']);
    });

    // Don't break old config files
    if (typeof userConfig.target === 'string') {
      userConfig.target = {
        path: userConfig.target
      }

      if (userConfig.suffix) {
        userConfig.target.suffix = userConfig.suffix;
      }
    }

    _.extend(config.target, userConfig.target);
    _.extend(config.schemas, userConfig.schemas);
    _.extend(config.templates, userConfig.templates);

    return config;
};
