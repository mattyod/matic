'use strict';

global.sinon = require('sinon');
global.should = require('chai')
  .use(require('sinon-chai'))
  .should();

(function () {
  global.sandbox = function (fn) {

    beforeEach(function () {
      global.sandbox = global.sinon.sandbox.create({
        injectInto: null,
        properties: ['spy', 'stub', 'mock']
      });
    });

    afterEach(function () {
      global.sandbox.restore();
    });

    return fn;
  };
})();
