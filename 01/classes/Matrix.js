const AugumentedNumber = require('./AugumentedNumber');
const AugumentedArray = require('./AugumentedArray');

module.exports = class Matrix {
  constructor(arr) {
    if (!Matrix.isValidMatrix(arr)) {
      throw new Error('Argument is not a valid matrix.');
    }
    this.value = arr;
    this.columns = [];
    // Filling columns with custom forEach method (Matrix specific)
    this.forEach((item, [i, j]) => {
      this.columns[j] = this.columns[j] ?? [];
      this.columns[j][i] = item;
    });
  }

  get columnsNumber() {
    return this.value[0].length;
  }

  get rowsNumber() {
    return this.value.length;
  }

  multiplyBy(multiplier) {
    if (AugumentedNumber.isValidNumber(multiplier)) {
      return this.#multiplyByNumber(multiplier);
    }
    if (multiplier instanceof Matrix) {
      return this.#multiplyByMatrix(multiplier);
    }
    throw new Error('Argument is not a valid number nor a valid matrix.');
  }

  #multiplyByNumber(number) {
    return new Matrix(this.map((element) => element * number));
  }

  #multiplyByMatrix(matrix) {
    if (!Matrix.areMultiCompatible(this, matrix)) {
      throw new Error('You cannot multiply those matrices');
    }
    const resultArray = [];
    for (let i = 0; i < this.rowsNumber; i += 1) {
      resultMatrix[i] = [];
      for (let j = 0; j < matrix.columnsNumber; j += 1) {
        resultMatrix[i][j] = AugumentedArray.reduceTwoArrays(
          this.value[i],
          matrix.columns[j],
        );
      }
    }
    return resultArray;
  }

  map(callback) {
    const resultMatrix = [];
    for (let i = 0; i < this.value.length; i += 1) {
      resultMatrix[i] = [];
      for (let j = 0; j < this.value[i].length; j += 1) {
        resultMatrix[i][j] = callback(this.value[i][j], [i, j], this.value);
      }
    }
    return resultMatrix;
  }

  forEach(callback) {
    for (let i = 0; i < this.value.length; i += 1) {
      for (let j = 0; j < this.value[i].length; j += 1) {
        callback(this.value[i][j], [i, j], this.value);
      }
    }
  }

  static areMultiCompatible(matrix1, matrix2) {
    if (!(matrix1 instanceof Matrix) || !(matrix2 instanceof Matrix)) {
      throw new Error('Invalid arguments! Both arguments need to be matrices.');
    }
    return matrix1.columnsNumber === matrix2.rowsNumber;
  }

  static isValidMatrix(source) {
    if (AugumentedArray.isArrayOfArrays(source)) {
      const rowLength = source[0].length;
      return source.every(
        (element) =>
          element.length === rowLength &&
          AugumentedArray.isArrayOfNumbers(element),
      );
    }
    return false;
  }
};
