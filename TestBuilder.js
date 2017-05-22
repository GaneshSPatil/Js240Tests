const HEADER = "var assert = require('assert');" +
               "var lib = require('../src/example.js');\n" +
               "var test = {};\n";

const FOOTER = "\nexports.test = test;\n";

var getTestsBody = function (testNames) {
  return testNames.map(function(testName) {
    return "test['" + testName + "'] = " + allTests[testName].toString() + ";";
  }).join("\n\n");
};

var clone = function(testNames) {
  return testNames.map(function(t) { return t; });
};

var allTests = require('./test/exampleTest.js').test;

var TestBuilder = function(existingTestNames) {
  var self = this;
  self.allTestNames = Object.keys(allTests);
  self.testeeTestNames = clone(existingTestNames);

  self.getUnsolvedTests = function() {
    var unsolvedTests = [];
    return self.allTestNames.filter(function(test) {
      return (self.testeeTestNames.indexOf(test) === -1);
    });

    return unsolvedTests;
  };

  self.canNewTestBeAdded = function() {
    return self.getUnsolvedTests().length > 0;
  };

  self.addNewTest = function() {
    if(self.canNewTestBeAdded()) {
      var testToAdd = self.getUnsolvedTests()[0];
      self.testeeTestNames.push(testToAdd);
      return testToAdd;
    } else {
      return null;
    }
  }

  self.getTestFileContent = function() {
    return {
      "complexNumberTest": [
        HEADER,
        getTestsBody(self.testeeTestNames),
        FOOTER
      ].join("\n")
    };
  };
};

module.exports = TestBuilder;
