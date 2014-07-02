'use strict';

var index = require('./index'),
    compile = require('./utils/compile'),
    render = require('./utils/render');

module.exports = function (config) {
  var template,
      fileName,
      compiled = compile.call(this, config);

  render.call(this, config, compiled);

  if (config.index) {
    template = compiled['index.' + config.schemas.suffix];
    fileName = 'index.' + config.target.suffix;

    this.clipboard.files[fileName] = template(index.call(this, config));
  }

  //delete this.clipboard.files.templates;

};
