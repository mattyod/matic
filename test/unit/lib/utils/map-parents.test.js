'use strict';

var map = require('../../../../lib/utils/map-parents'),
    _ = require('underscore');

describe('lib/utils/map-parents', sandbox(function () {
  var object, mapping;

  beforeEach(function () {
    object = {
      foo: { id: 'foobar', nested: { id: 'xxx' } },
      bar: { id: 'qwerty' },
      baz: { notId: 'bar' }
    };

    mapping = map(object, 'id');
  });

  it('returns a flat object keyed by the requested inner key', function () {
    mapping.foobar.should.deep.equal(object.foo);
    mapping.xxx.should.deep.equal(object.foo.nested);
    mapping.qwerty.should.deep.equal(object.bar);
  });

  it('only maps the child objects containing the requested keys', function () {
    _.keys(mapping).should.deep.equal([ 'foobar', 'xxx', 'qwerty' ]);
  });

}));
