const Piece = require('./Piece');

class Bishop extends Piece {
  constructor(color) {
    super('bishop', color);
    this.moves = {
      type: 'diagonal',
      limit: false,
    };
  }
}

module.exports = Bishop;
