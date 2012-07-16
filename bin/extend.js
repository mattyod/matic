/*
  
  extend.js

  Here we check if the folder from which Schema was invoked contains a config.js file
  If it does we load it in an extend our app config with any different settings it may have.
  This allows the user to over write any default values such as the target folder.

  Accepts: config, our config object

  Returns: config, a possibly extended config file

*/

var fs  = require('fs'),
    _   = require('underscore');

module.exports = function(config) {

  // Build our config file path from the current process path
  var configPath = process.env.PWD + '/config.json';

  // If there is a config.json file in our build folder
  if(fs.existsSync(configPath)) {
    
    // Load it and extend our existing config with it
    config = _.extend(config, JSON.parse(fs.readFileSync(configPath, 'binary'))); 
  
  }

  return config;

}