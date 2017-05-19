var assert = require('assert');
var lib = require('../src/example.js');

var add = lib.add;
var subtract = lib.subtract;
var multiply = lib.multiply;
var divide = lib.divide;

var test = {};

test["add should add two numbers"] = function () {
  assert.equal(add(2, 3), 5);
};

test["subtract should subtract one number from another"] = function () {
  assert.equal(subtract(2, 3), -1);
};

test["multiply should multiply two numbers"] = function () {
  assert.equal(multiply(2, 3), 6);
};

test["divide should divide one number from another"] = function () {
  assert.equal(divide(6, 3), 2);
};
exports.test = test;
