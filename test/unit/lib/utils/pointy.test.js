'use strict';

var point = require('../../../../lib/utils/pointy');

describe('lin/utils/pointy', sandbox(function () {
  var parentObj, obj;

  beforeEach(function () {
    obj = { foo: 'bar'};

    parentObj = {
      foo: {
        bar: {
          'baz.json': JSON.stringify(obj)
        }
      }
    };
  });

  it('returns the child object and it\'s path', function () {
    point(parentObj, './bar/baz.json', './foo/file.json').should.deep.equal({
      obj: obj,
      path: 'foo/bar/baz.json'
    });

    point(parentObj, './baz.json', './foo/bar/file.json').should.deep.equal({
      obj: obj,
      path: 'foo/bar/baz.json'
    });
  });

  it('returns path and false if the object doesn\'t exist', function () {
    point(parentObj, './bar/notThere.json', './foo/file.json').should.deep.equal({
      obj: false,
      path: 'foo/bar/notThere.json'
    });
  });

}));
