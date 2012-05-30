
module.exports = {
  setUp: function(callback) {
    callback();
  },
  tearDown: function(callback) {
    callback();  
  },
  test: function(test) {
    test.expect(1);

    test.equals(1, 1);

    test.done();
  }
};