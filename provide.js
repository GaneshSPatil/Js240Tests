var fs = require('fs');
var allTests = require('./test/exampleTest.js').test;
var allTestNames = Object.keys(allTests);

const HEADER = "var assert = require('assert');" +
               "var lib = require('../src/example.js');\n" +
               "var test = {};\n";

const FOOTER = "\nexports.test = test;\n";

var getTestsBody = function (testNames) {
  return testNames.map(function(testName) {
    return "test['" + testName + "'] = " + allTests[testName].toString() + ";";
  }).join("\n\n");
};

var getUnsolvedTests = function(existingTests) {
  var unsolvedTests = [];
  return allTestNames.filter(function(test) {
    return (existingTests.indexOf(test) === -1);
  });
};

var addNewTest = function(existingTests, testToAdd, testeeProjectPath) {
  existingTests.push(testToAdd);
  var testeeTests = getTestsBody(existingTests);

  var content = [
    HEADER,
    testeeTests,
    FOOTER
  ].join('\n');

  fs.writeFileSync(testeeProjectPath + '/test/exampleTest.js', content);
  return { isAdded: true, testName: testToAdd };
};

module.exports = function(testeeProjectPath, existingTests = []) {
  var unresolvedTests = getUnsolvedTests(existingTests);
  if(unresolvedTests.length > 0) {
    return addNewTest(existingTests, unresolvedTests[0], testeeProjectPath);
  } else {
    return { isAdded: false, testName: null };
  };
};
