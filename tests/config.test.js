// Tested module
var config = require('../lib/config');

module.exports = {
  
  config: function(test) {

    test.expect(6);

    test.ok(config.source,
      'source reference exists');
    
    test.ok(config.target,
      'target reference exists');

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