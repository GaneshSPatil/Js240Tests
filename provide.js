var TestBuilder = require('./TestBuilder.js');

module.exports = function(existingTests = []) {
  var testBuilder = new TestBuilder(existingTests);

  var canNewTestBeAdded = testBuilder.canNewTestBeAdded();
  var newTestName = testBuilder.addNewTest();

  return {
    "testFiles": testBuilder.getTestFileContent(),
    "testName": newTestName,
    "isAdded": canNewTestBeAdded
  }
};
