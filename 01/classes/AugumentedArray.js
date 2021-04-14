const AugumentedNumber = require('./AugumentedNumber');

module.exports = class AugumentedArray {
  static isArrayOfArrays(source) {
    return (
      Array.isArray(source) &&
      source.length > 0 &&
      source.every((element) => Array.isArray(element))
    );
  }

  static isArrayOfNumbers(source) {
    return source.every((element) => AugumentedNumber.isValidNumber(element));
  }

  static reduceTwoArrays(array1, array2) {
    if (
      !AugumentedArray.isArrayOfNumbers(array1) ||
      !AugumentedArray.isArrayOfNumbers(array2)
    ) {
      throw new Error(
        'Incorrect arguments, this method accepts two arrays of numbers only',
      );
    }

    return array1.reduce(
      (sum, currentNumber, index) => sum + currentNumber * array2[index],
      0,
    );
  }
};
