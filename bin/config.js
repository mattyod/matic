/*
  config.js

  Required config values are contained here.

*/

module.exports = (function () {

  return {
    'source': './schemas/',
    'target': './web/',
    'schemas': './schemas/',
    'suffix': '.html',
    'template': {
      'path': './templates/',
      'file': 'default',
      'lib': 'jade'
    }
  };

})();