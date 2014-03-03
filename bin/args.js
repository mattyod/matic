'use strict';

/*

  args.js

  Check for any arguments passed with the call to Matic and route them
  accordingly.

*/

module.exports = (function () {

  // Capture any arguments passed to Matic
  var args = process.argv.slice(2);

  // If there are any.
  if (args.length) {

    // Take the first and attempt to act upon it.
    switch (args[0]) {
    case '--help':
    case '-help':
    case '-h':
    case 'help':
      require('./args/help');
      break;
    case '--version':
    case '-version':
    case '-v':
    case 'version':
      require('./args/version');
      break;
    default:
      process.stdout.write('Unknown argument, try matic help');

    }

  }

})();
