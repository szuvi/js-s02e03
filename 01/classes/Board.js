const Matrix = require('./Matrix');
const Field = require('./Field');

module.exports = class Board {
  constructor(fieldsData) {
    const fieldsMatrix = new Matrix(fieldsData);
    this.fields = fieldsMatrix.map((value) => new Field(value));
  }

  getField([x, y]) {
    return this.fields[x][y];
  }
};
