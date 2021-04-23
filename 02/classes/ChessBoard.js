/* eslint-disable no-use-before-define */
class ChessBoard {
  constructor() {
    this.board = createEmptyBoard();
  }

  placePiece([row, column], piece) {
    if (this.board[row][column] != null) {
      throw new Error('The field is already occupied!');
    }
    this.board[row][column] = piece;
  }

  removePiece([row, column]) {
    if (this.board[row][column] == null) {
      throw new Error('The field is already empty!');
    }
    this.board[row][column] = null;
  }

  isFieldOccupied([row, column]) {
    return this.board[row][column] !== null;
  }

  getPiece([row, column]) {
    if (this.isFieldOccupied([row, column])) {
      return this.board[row][column];
    }
    return null;
  }

  getRandomPosition() {
    const randomRow = Math.floor(Math.random() * 8);
    const randomColumn = Math.floor(Math.random() * 8);
    if (this.isFieldOccupied([randomRow, randomColumn])) {
      return this.getRandomPosition();
    }
    return [randomRow, randomColumn];
  }

  display(outputCallback = console.log) {
    this.board.forEach((row) => outputCallback(this.displayRow(row)));
  }

  // not sure where to put this
  // eslint-disable-next-line class-methods-use-this
  displayRow(row) {
    return row.reduce((output, field) => {
      if (field === null) return `${output}  X`;
      return `${output} ${field.notation}`;
    }, '');
  }
}

function createEmptyBoard() {
  const board = [];
  for (let row = 0; row < 8; row += 1) {
    board[row] = [];
    for (let column = 0; column < 8; column += 1) {
      board[row][column] = null;
    }
  }
  return board;
}

module.exports = ChessBoard;
