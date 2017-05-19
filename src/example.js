var lib = {};

lib.add = function(num1, num2) {
    return num1 + num2;
};

lib.subtract = function(num1, num2) {
    return num1 - num2;
};

lib.multiply = function(num1, num2) {
    return num1 * num2;
};

lib.divide = function(num1, num2) {
    return num1 / num2;
};

module.exports = lib;
