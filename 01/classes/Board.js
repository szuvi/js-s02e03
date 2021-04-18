const Matrix = require('./Matrix');
const Field = require('./Field');

module.exports = class Board {
  constructor(fieldsData) {
    const fieldsMatrix = new Matrix(fieldsData);
    this.fields = fieldsMatrix.map(
      (hint, position) => new Field(position, hint),
    );
  }

  getField([x, y]) {
    return this.fields[x][y];
  }
};
