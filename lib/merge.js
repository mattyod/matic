'use strict';

var _ = require('underscore'),
    log = require('col'),
    pointy = require('./utils/pointy'),
    map = require('./utils/mapParents');

module.exports = function () {
  var ids = {};

  var itterate = function (obj, parentKey, parentObj, schema) {

    _.each(obj, function (val, key) {
      var subSchema;

      // Attempt to resolve the $ref within the parent schema
      var inline = function () {
        return ids[schema][val] || false;
      };

      // Attempt to resolve the $ref against the clipboard/filesystem
      var local = function () {
        return pointy(this.clipboard.files.schemas, val);
      }.bind(this);

      if (key === '$ref') {
        if (val.match('http://')) {
          log.warn('currently unable to resolve url based refs:');
          log.info(parentKey + '.' + key + ':', val);
        } else {
          subSchema = inline() || local();

          if (subSchema) {
            parentObj[parentKey] = merge(subSchema, val);
          } else {
            log.warn('unable to resolve subSchema', val);
          }
        }
      }

      if (typeof key === 'string' && key.match(/^(all|any)Of$/) && _.isArray(val)) {
        _.each(val, function (object, index) {
          if (_.isObject(object)) {
            itterate(object, index, val, schema);
          } else {
            log.warn('Encountered ' + key + 'but it isn\'t an array of objects');
          }
        }, this);
      }

      if (_.isObject(val) && !_.isArray(val)) {
        itterate(val, key, obj, schema);
      }

    }.bind(this));

    return obj;

  }.bind(this);

  var merge = function (val, key) {
    ids[key] = map(val, 'id');
    return itterate(val, null, null, key);
  };

  _.each(this.clipboard.files.schemas, function (val, key) {

    if (typeof val === 'string') {
      this.clipboard.files.schemas[key] = JSON.stringify(merge(JSON.parse(val), key));
    }

  }, this);

};
