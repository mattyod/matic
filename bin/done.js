/*
    done.js

    Outputs the console completion message.

    Accepts: config - the config object

*/

module.exports = function (config) {

  return '\nDocumentation built to ' + config.target + '\n\n';

};