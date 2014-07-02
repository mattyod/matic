'use strict';

var index = require('../../../lib/index');

describe('lib/index', sandbox(function () {
  var config, result, expected;

  beforeEach(function () {
    this.clipboard = {
      files: {
        'index.html': '123',
        schemas: {
          'bar.json': '123',
          bars: {
            'baz.json': '123'
          }
        },
        ignored: {
          foo: '123'
        }
      }
    };

    config = {
      index: {
        schemas: true
      }
    };

    expected = {
      files: {
        'index.html': 'index.html',
        schemas: {
          'bar.json': 'schemas/bar.json',
          bars: {
            'baz.json': 'schemas/bars/baz.json'
          }
        }
      }
    };

    result = index.call(this, config);
  });

  it('returns an object which indexes all the files from the clipboard', function () {
    result.should.deep.equal(expected);
  });

}));
