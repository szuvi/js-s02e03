const King = require('./King');
const Rook = require('./Rook');
const Bishop = require('./Bishop');
const Queen = require('./Queen');
const Knight = require('./Knight');

const SingletonPieceFactory = (function SingletonIIFE() {
  let instance = null;
  class PieceFactory {
    constructor() {
      this.pieces = {
        king: (color) => new King(color),
        rook: (color) => new Rook(color),
        bishop: (color) => new Bishop(color),
        queen: (color) => new Queen(color),
        knight: (color) => new Knight(color),
      };
    }

    getPiece(pieceName, color) {
      return this.pieces[pieceName](color); // TODO verification
    }

    getRandomPiece() {
      const randomIndex = Math.floor(Math.random() * PieceFactory.names.length);
      const randomName = PieceFactory.names[randomIndex];
      const randomColor =
        Math.floor(Math.random() * 2) >= 1 ? 'white' : 'black';
      return this.getPiece(randomName, randomColor);
    }

    static get names() {
      return ['king', 'queen', 'rook', 'knight', 'bishop'];
    }
  }

  const init = () => new PieceFactory();

  return {
    getInstance() {
      if (instance == null) {
        instance = init();
      }
      return instance;
    },
  };
})();

module.exports = SingletonPieceFactory;
