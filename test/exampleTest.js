var assert = require('assert');
var lib = require('../src/example.js');

var test = {};

test["add should add two numbers"] = function () {
  var add = lib.add;
  assert.equal(add(2, 3), 5);
};

test["subtract should subtract one number from another"] = function () {
  var subtract = lib.subtract;
  assert.equal(subtract(2, 3), -1);
};

test["multiply should multiply two numbers"] = function () {
  var multiply = lib.multiply;
  assert.equal(multiply(2, 3), 6);
};

test["divide should divide one number from another"] = function () {
  var divide = lib.divide;
  assert.equal(divide(6, 3), 2);
};

exports.test = test;
