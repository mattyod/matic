'use strict';

var _ = require('underscore'),
    log = require('col'),
    pointy = require('./utils/pointy'),
    map = require('./utils/mapParents');

module.exports = function () {
  var ids = {};

  var itterate = function (obj, parentKey, parentObj, schema) {

    _.each(obj, function (val, key) {

      // Attempt to resolve the $ref within the parent schema
      var inline = function () {
        return ids[schema][val] || false;
      };

      // Attempt to resolve the $ref against the clipboard/filesystem
      var local = _.bind(function () {
        return pointy(this.clipboard.files.schemas, val);
      }, this);

      if (key === '$ref') {
        if (val.match('http://')) {
          log.warn('url ref', val);
        } else {
          parentObj[parentKey] = inline() || local() || parentObj[parentKey];
        }
      }

      if (_.isObject(val) && !_.isArray(val)) {
        itterate.call(this, val, key, obj, schema);
      }

    }, this);

    return obj;

  };

  _.each(this.clipboard.files.schemas, function (val, key) {
    var schema;

    if (typeof val === 'string') {
      schema = JSON.parse(val);
      ids[key] = map(schema, 'id');

      this.clipboard.files.schemas[key] = itterate.call(this, schema, null, null, key);
    }

  }, this);

};
