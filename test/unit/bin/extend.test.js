'use strict';

var extend = require('../../../bin/extend'),
    path = require('path'),
    log = require('col');

describe('bin/extend', sandbox(function () {
  var config, expected;

  beforeEach(function () {
    config = {
      target: {
        path: 'web',
        suffix: 'html'
      },
      schemas: {
        path: 'schemas',
        suffix: 'json',
        indent: 2
      },
      templates: {
        folder: true,
        path: 'templates',
        file: 'default',
        lib: 'jade',
        suffix: 'jade'
      }
    };

    expected = {
      target: {
        path: 'bar',
        suffix: 'html'
      },
      schemas: {
        path: 'schemas',
        suffix: 'json',
        indent: 2
      },
      templates: {
        folder: true,
        path: 'templates',
        file: 'default',
        lib: 'jade',
        suffix: 'jade'
      },
      index: {
        schemas: true
      },
      assets: [ 'foo', 'bar' ]
    };

    sandbox.stub(log, 'warn');
  });

  describe('for old style config files', function () {

    beforeEach(function () {
      sandbox.stub(process, 'cwd')
        .returns(path.join(__dirname, '../../testfiles/old-style-config/'));
    });

    it('extends the user config and updates it to the new format', function () {
      extend(config).should.deep.equal(expected);
    });

  });

  describe('for new stlye .rc files', function () {

    beforeEach(function () {
      sandbox.stub(process, 'cwd')
        .returns(path.join(__dirname, '../../testfiles/new-style-rc/'));
    });

    it('extends the user config', function () {
      extend(config).should.deep.equal(expected);
    });

  });

}));
