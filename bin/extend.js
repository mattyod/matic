'use strict';

/*

  extend.js

  Checks if the folder from which Matic was invoked contains a config.json file
  If it does we load it in an extend our app config with any different settings
  it may have. This allows the user to over write any default values such as the
  target folder.

  Accepts: config, the config object.

  Returns: config, a possibly extended config object.

*/

var _ = require('underscore'),
    rightClick = require('rightClick'),
    getConfig = require('./get-config'),
    log = require('col');

module.exports = function (config) {
  var userConfig = {},
      configFile = getConfig();

  rightClick(process.cwd(), 'utf8')
    .copy(configFile)
    .tap(function () {
      if (!_.isEmpty(this.clipboard.files)) {
        _.extend(userConfig, JSON.parse(this.clipboard.files[configFile]));
      }
    });

  // Don't break old (draft 3) config files
  if (typeof userConfig.target === 'string') {
    userConfig.target = {
      path: userConfig.target
    };
    log.warn('Config target attribute is deprecated. Please use target.path');

    if (userConfig.suffix) {
      userConfig.target.suffix = userConfig.suffix;
      log.warn('Config suffix attribute is deprecated. Please use target.suffix');
    }
  }

  if (userConfig.index) {
    config.index = userConfig.index;
  }

  config.assets = userConfig.assets;
  _.extend(config.target, userConfig.target);
  _.extend(config.schemas, userConfig.schemas);
  _.extend(config.templates, userConfig.templates);

  return config;
};
