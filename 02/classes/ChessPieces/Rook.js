const Piece = require('./Piece');

class Rook extends Piece {
  constructor(color) {
    super('rook', color);
    this.moves = {
      type: 'straight',
      limit: false,
    };
  }
}

module.exports = Rook;
