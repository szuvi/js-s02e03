const Piece = require('./Piece');

class Queen extends Piece {
  constructor(color) {
    super('queen', color);
    this.moves = {
      type: ['diagonal', 'straight'],
      limit: false,
    };
  }
}

module.exports = Queen;
