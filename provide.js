var TestBuilder = require('./TestBuilder.js');

module.exports = function(existingTests = []) {
  var testBuilder = new TestBuilder(existingTests);

  var canNewTestBeAdded = testBuilder.canNewTestBeAdded();
  var addedTestMetadata = testBuilder.addNewTest();

  return {
    "testFiles": testBuilder.getTestFileContent(),
    "testName": addedTestMetadata.testName,
    "isAdded": canNewTestBeAdded,
    "error": testBuilder.getError(),
    "info": testBuilder.getInfo(),
    "filesChanged": addedTestMetadata.filesChanged
  }
};
