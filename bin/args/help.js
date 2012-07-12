/*

  help.js
  
  Self invoking module

  Outputs help text to console when called

*/

var fs = require('fs');

module.exports = (function() {
  var help = 
  '\n' +
  'Schema.js\n' +
  '---------\n\n' +
  'Arguments\n' +
  '---------\n' +
  '  --help, -h, help: All the helps.' +
  '\n\n';

  console.log(__dirname);
  var help = fs.readFileSync(__dirname + '/output/help.txt', 'binary');

  // Write out help text to the terminal
  process.stdout.write(help);

  // Exit the application with success code
  process.exit(0);

})();