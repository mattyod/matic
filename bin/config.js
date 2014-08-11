'use strict';

/*
  config.js

  Required config values are contained here.

*/

module.exports = (function () {

  return {
    target: {
      path: 'web',
      suffix: 'html'
    },
    schemas: {
      path: 'schemas',
      suffix: 'json',
      indent: 2
    },
    templates: {
      folder: true,
      path: 'templates',
      file: 'default',
      lib: 'jade',
      suffix: 'jade'
    }
  };

})();
