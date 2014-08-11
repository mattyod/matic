'use strict';

var render = require('../../../../lib/utils/render');

describe('lin/utils/render', sandbox(function () {
  var config,
      compiled;

  beforeEach(function () {
    config = {
      schemas: {
        suffix: 'json'
      },
      target: {
        suffix: 'html'
      },
      templates: {
        file: 'index'
      }
    };

    compiled = {
      foo: sandbox.stub().returns('success')
    };

    this.clipboard = {
      files: {
        schemas: {
          foo: '{"bar":"baz"}'
        }
      }
    };

    render.call(this, config, compiled);
  });

  it('sets rendered files to the clipboard', function () {
    this.clipboard.files.foo.should.equal('success');
  });

}));
