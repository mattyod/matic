'use strict';

var _ = require('underscore');

module.exports = function (config) {
  var engine = require(config.templates.lib),
      templateMatcher = new RegExp(config.templates.suffix + '$'),
      compiled = {};

  _.each(this.clipboard.files.templates, function (template, name) {
    if (name.match(templateMatcher)) {
      name = name.replace(templateMatcher, config.schemas.suffix);
      compiled[name] = engine.compile(template, {
        filename: config.templates.path
      });
    }
  });

  return compiled;
};
