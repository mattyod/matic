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
    path  = require('path');

module.exports = function(config) {

  // Build the config file path from the current process path
  var configPath = process.cwd() + path.sep + 'config.json';
  
  // If there is a config.json file in the build folder
  if(fs.existsSync(configPath)) {
    
    // Read it and extend the existing config with it
    config = _.extend(config, JSON.parse(fs.readFileSync(configPath, 'binary')));

  }

  return config;

};