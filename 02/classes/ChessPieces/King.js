const Piece = require('./Piece');

class King extends Piece {
  constructor(color) {
    super('king', color);
    this.moves = {
      type: 'diagonal',
      limit: true,
    };
  }
}

module.exports = King;
