'use strict';

var _ = require('underscore');

module.exports = function (config, compiled) {
  var template,
      fileName,
      schemaMatcher = new RegExp(config.schemas.suffix + '$'),
      defaultTemplate = config.templates.file + '.' + config.schemas.suffix;

  _.each(this.clipboard.files.schemas, function (schema, name) {
    if (typeof schema === 'string') {
      template = compiled[name] || compiled[defaultTemplate];
      fileName = name.replace(schemaMatcher, config.target.suffix);
      schema = JSON.parse(schema);
      schema.config = config;
      this.clipboard.files[fileName] = template(schema);
    }
  }.bind(this));

};
