'use strict';

var _ = require('underscore'),
    log = require('col'),
    local = require('./utils/local'),
    pointy = require('./utils/pointy'),
    map = require('./utils/map-parents');

module.exports = function (indent) {
  var ids = {};

  var itterate = function (obj, parentKey, parentObj, schema) {

    _.each(obj, function (val, key) {
      var subSchema;

      if (key === '$ref') {
        if (val.match('http://')) {
          log.warn('currently unable to resolve url based refs:');
          log.info(parentKey + '.' + key + ':', val);
        } else {
          if (ids[schema][val]) {
            subSchema = {
              path: val,
              obj: _.omit(ids[schema][val], 'id')
            };
          } else {
            subSchema = pointy(this.clipboard.files.schemas, schema, val) ||
              local(this.clipboard.files.schemas, val, schema);
          }

          if (subSchema) {
            parentObj[parentKey] = merge(subSchema.obj, subSchema.path);
          } else {
            log.warn('unable to resolve subSchema', val);
          }
        }
      }

      if (_.isArray(val)) {
        var arr = val;
        val = [];

        _.each(arr, function (object, index) {
          if (_.isObject(object)) {
            val.push(itterate(object, index, arr, schema));
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
      this.clipboard.files.schemas[key] = JSON.stringify(merge(JSON.parse(val), key), null, indent);
    }

  }, this);

};
