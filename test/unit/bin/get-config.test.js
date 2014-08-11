'use strict';

var getConfig = require('../../../bin/get-config'),
    fs = require('fs'),
    log = require('col');

describe('bin/get-config', sandbox(function () {
  var config, files;

  describe('dot file', function () {

    beforeEach(function () {
      files = ['foo.bar', '.maticrc', 'config.json', 'bar.foo'];

      sandbox.stub(fs, 'readdirSync')
        .returns(files);

      config = getConfig();
    });

    it('returns the name of the dot file', function () {
      config.should.equal('.maticrc');
    });

  });

  describe('config file', function () {

    beforeEach(function () {
      files = ['foo.bar', 'config.json', 'bar.foo'];

      sandbox.stub(fs, 'readdirSync')
        .returns(files);

      sandbox.stub(log, 'warn');

      config = getConfig();
    });

    it('returns the name of the json file', function () {
      config.should.equal('config.json');
    });

    it('logs a deprecation warning', function () {
      (typeof log.warn.args[0][0]).should.equal('string');
    });

  });

}));
