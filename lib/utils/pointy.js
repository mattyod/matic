'use strict';

var _ = require('underscore');

module.exports = function (schemas, path, pointer) {
  var pathFragments = path.split(/\//),
      pointerFragments = _.without(pointer.split(/\/|#/), ''),
      schema,
      val,
      failed = false;

  var getObject = function (obj, fragments) {
    failed = _.find(fragments, function (fragment) {
      if (obj[fragment]) {
        obj = obj[fragment];
      } else {
        return true;
      }
    });

    return obj;
  };

  schema = getObject(schemas, pathFragments);
  val = getObject(JSON.parse(schema), pointerFragments);

  if (!failed) {
    return {
      path: path,
      obj: _.omit(val, 'id')
    };
  }

};
