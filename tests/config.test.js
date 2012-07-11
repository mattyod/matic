// Tested module
var config = require('../lib/config');

module.exports = {
  
  config: function(test) {

    test.expect(7);

    test.ok(config.source);
    test.ok(config.target);
    test.ok(config.schemas);
    test.ok(config.template);
    test.ok(config.template.path);
    test.ok(config.template.file);
    test.ok(config.template.lib);

    test.done();

  }

};