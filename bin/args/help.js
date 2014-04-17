'use strict';

/*

  help.js

  Self invoking module

  Outputs help text to console when called

*/

var fs = require('fs'),
    log = require('col');

module.exports = (function () {

  var help = fs.readFileSync(__dirname + '/output/help.txt', 'binary');

  // Write out help text to the terminal
  log.success(help);

  // Exit the application with success code
  process.exit(0);

})();
