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
    if (this.isFieldOccupied[(row, column)]) {
      return this.board[row][column];
    }
    return null;
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
}

module.exports = ChessBoard;
