module.exports = class AugumentedNumber {
  static isValidNumber(source) {
    return (
      typeof source === 'number' &&
      !Number.isNaN(source) &&
      source !== Infinity &&
      source !== -Infinity
    );
  }
};
