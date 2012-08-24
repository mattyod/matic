/*

    config.js

    Self invoking module.
    
    All required config values are stored here.

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