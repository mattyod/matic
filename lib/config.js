/*

    config.js

    All general config values are stored here

*/

module.exports = (function() {

  return {
    'source': './schemas/',
    'target': './web/',
    'schemas': './schemas/',
    'template': {
      'path': './templates/',
      'file': 'default',
      'lib': 'jade'
    }
  };

})();