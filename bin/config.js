/*
  config.js

  Required config values are contained here.

*/

module.exports = (function () {

  return {
    'target': './web/',
    'schemas': './schemas/',
    'suffix': '.html',
    'template': {
      'folder': true,
      'path': './templates/',
      'file': 'default',
      'lib': 'jade'
    }
  };

})();
