'use strict';

/*
    check.js

    Perform a check to see if the specified template engine is available.
    If it isn't offer a friendly error message

*/

var log = require('col');

module.exports = function (config) {
  var valid = false;

  var msgs = {
    configError: 'The config file does not specify a templating engine, please add one.\n',
    requireError: ''
  };

  if (config.templates && config.templates.lib) {

    msgs.requireError = 'The config file speicifies ' + config.templates.lib +
    ' as the templating engine but it is not installed. \nPlease run: \n' +
    'npm install -g ' + config.templates.lib + '\n';

    try {
      require.resolve(config.templates.lib);
      valid = true;
    } catch (error) {
      log.error(msgs.requireError);
    }
  } else {
    log.error(msgs.configError);
  }

  return valid;
};
