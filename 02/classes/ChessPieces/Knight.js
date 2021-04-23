const Piece = require('./Piece');

class Knight extends Piece {
  constructor(color) {
    super('knight', color);
    this.moves = {
      type: 'knight',
      limit: true,
    };
  }
}

module.exports = Knight;
