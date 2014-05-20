'use strict';

var _ = require('underscore');

module.exports = function (config) {
  var engine = require(config.templates.lib),
      templateMatcher = new RegExp(config.templates.suffix + '$'),
      schemaMatcher = new RegExp(config.schemas.suffix + '$'),
      defaultTemplate = config.templates.file + '.' + config.schemas.suffix;

  var compiled = {};

  _.each(this.clipboard.files.templates, function (template, name) {
    if (name.match(templateMatcher)) {
      name = name.replace(templateMatcher, config.schemas.suffix);

      compiled[name] = engine.compile(template, {
        filename: config.templates.path
      });
    }
  });

  _.each(this.clipboard.files.schemas, function (schema, name) {
    var template,
        fileName;

    if (typeof schema === 'string') {
      template = compiled[name] || compiled[defaultTemplate];
      fileName = name.replace(schemaMatcher, config.target.suffix);

      this.clipboard.files[fileName] = template(JSON.parse(schema));
    }
  }.bind(this));

  delete this.clipboard.files.templates;

};
