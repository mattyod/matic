'use strict';

var compile = require('../../../../lib/utils/compile');

describe('lib/utils/compile', sandbox(function () {
  var config,
      compiled;

  beforeEach(function () {
    config = {
      templates: {
        lib: 'jade',
        suffix: 'jade'
      },
      schemas: {
        suffix: 'json'
      }
    };

    this.clipboard = {
      files: {
        templates: {
          'foo.jade': 'h1 foo',
          'bar.jade': 'h1 bar'
        }
      }
    };

    compiled = compile.call(this, config);
  });

  it('compiles templates with the schema suffix', function () {
    (typeof compiled['foo.json']).should.equal('function');
    (typeof compiled['bar.json']).should.equal('function');
  });

  it('clears the templates from the clipboard', function () {
    (this.clipboard.files.templates === undefined).should.be.true;
  });

}));
