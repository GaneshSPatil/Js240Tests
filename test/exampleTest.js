var assert = require('assert');
var lib = require('../src/example.js');
var add = lib.add;

var test = {};

test["add should add two numbers"] = function () {
  assert.equal(add(2, 3), 5);
}

exports.test = test;
