var version = require('../../package.json').version;

module.exports = (function() {

  // Write out the version to the terminal
  process.stdout.write('schema: v' + version + '\n');

  // Exit the application with a success code
  process.exit(0);

})();