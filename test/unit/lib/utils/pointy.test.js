'use strict';

var local = require('../../../../lib/utils/local');

describe('lin/utils/localy', sandbox(function () {
  var parentObj, obj;

  beforeEach(function () {
    obj = { foo: 'bar' };

    parentObj = {
      foo: {
        bar: {
          'baz.json': JSON.stringify(obj)
        }
      }
    };
  });

  it('returns the child object and it\'s path', function () {
    local(parentObj, './bar/baz.json', './foo/file.json').should.deep.equal({
      obj: obj,
      path: 'foo/bar/baz.json'
    });

    local(parentObj, './baz.json', './foo/bar/file.json').should.deep.equal({
      obj: obj,
      path: 'foo/bar/baz.json'
    });
  });

  it('returns path and false if the object doesn\'t exist', function () {
    local(parentObj, './bar/notThere.json', './foo/file.json').should.deep.equal({
      obj: false,
      path: 'foo/bar/notThere.json'
    });
  });

}));
