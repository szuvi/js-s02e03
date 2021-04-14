const Matrix = require('./Matrix');
const Field = require('./Field');

module.exports = class Board {
  constructor(fieldsData) {
    const fieldsMatrix = new Matrix(fieldsData);
    this.values = fieldsMatrix.map((value) => new Field(value));
  }
};
