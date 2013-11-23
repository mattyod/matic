'use strict';

/*

  help.js

  Self invoking module

  Outputs help text to console when called

*/

var fs = require('fs');

module.exports = (function () {

  var help = fs.readFileSync(__dirname + '/output/help.txt', 'binary');

  // Write out help text to the terminal
  process.stdout.write(help);

  // Exit the application with success code
  process.exit(0);

})();