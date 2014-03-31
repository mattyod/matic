'use strict';

/*
    done.js

    Outputs the console completion message.

    Accepts: config - the config object

*/

module.exports = function (config) {

  return 'Documentation built to ' + config.target.path + '\n';

};
