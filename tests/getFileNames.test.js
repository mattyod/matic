// Tested module
//var getFileNames = require('../lib/getFileNames');

// Helper modules
var fs = require('fs');
var exec = require('child_process').exec;
console.log(fs.rmdirSync.toString());

module.exports = {
	setUp: function(callback) {
		fs.mkdirSync('testFiles');

		fs.writeFileSync('./testFiles/test1.json', 'test file', 'binary');
		callback();
	},
	tearDown: function(callback) {
		//fs.unlinkSync('./testFiles/test1.json');
		//fs.rmdirSync('testFiles');
			console.log(process.platform);
			exec('rm -rf testFiless', function(asd) {
				callback();
			});
		//process.exec('rm -rf testFiles');
		//callback();
	},
	test1: function(test) {
		test.done();
	}
};