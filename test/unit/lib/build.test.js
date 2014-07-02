'use strict';

var build = require('../../../lib/build');

describe('lib/buid', function () {
  var config;

  beforeEach(function () {
    config = {
      templates: {
        lib: 'jade',
        suffix: 'jade',
        file: 'index'
      },
      schemas: {
        suffix: 'json'
      },
      target: {
        suffix: 'html'
      }
    };

    this.clipboard = {
      files: {
        templates: {
          'foo.jade': 'h1= id',
          'bar.jade': 'h1= id'
        },
        schemas: {
          'foo.json': JSON.stringify({ id: 'foo' }),
          'bar.json': JSON.stringify({ id: 'bar' })
        }
      }
    };

    build.call(this, config);
  });

  it('sets rendered files to the clipboard', function () {
    this.clipboard.files['foo.html']
      .should.equal('<h1>foo</h1>');
    this.clipboard.files['bar.html']
      .should.equal('<h1>bar</h1>');
  });

});
