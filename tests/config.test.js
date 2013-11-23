'use strict';

// Tested module
var config = require('../bin/config');

module.exports = {

  config: function (test) {

    test.expect(7);

    test.ok(config.target,
      'target reference exists');

    test.ok(config.schemas,
      'schemas source reference exists');

    test.ok(config.suffix,
      'generated file suffix reference exists');

    test.ok(config.template,
      'template object exits');

    test.ok(config.template.path,
      'template path reference exists');

    test.ok(config.template.file,
      'template file reference exists');

    test.ok(config.template.lib,
      'template lib reference exists');

    test.done();

  }

};