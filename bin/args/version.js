'use strict';

/*
	version.js

	Self invoking module.

	Write out the current version number of the application.

*/

// Get application version from the package file.
var version = require('../../package.json').version,
    log = require('col');

module.exports = (function () {

  // Write out the version to the terminal
  log.success('v' + version);

  // Exit the application with a success code
  process.exit(0);

})();
