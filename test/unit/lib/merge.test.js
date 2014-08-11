'use strict';

var merge = require('../../../lib/merge');

describe('lib/merge', sandbox(function () {
  var merged;

  beforeEach(function () {
    this.clipboard = {
      files: {
        schemas: {
          'foo.json': JSON.stringify({ 'properties': { $ref: './includes/foo2.json' }}),
          'bar.json': JSON.stringify({ 'properties': { $ref: './includes/bar2.json' }}),
          includes: {
            'foo2.json': JSON.stringify({ name: 'foo' }),
            'bar2.json': JSON.stringify({ name: 'bar' })
          }
        }
      }
    };

    merge.call(this, 2);
  });

  it('merges includes into schemas', function () {
    merged = JSON.parse(this.clipboard.files.schemas['foo.json']);

    merged.properties.name.should.equal('foo');

    merged = JSON.parse(this.clipboard.files.schemas['bar.json']);

    merged.properties.name.should.equal('bar');
  });

}));
