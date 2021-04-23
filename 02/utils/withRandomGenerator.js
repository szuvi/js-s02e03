/* eslint-disable no-param-reassign */
const Piece = require('../classes/ChessPieces/Piece');

function withRandomPlacer(gameClass) {
  gameClass.placeRandom = function placeRandom() {
    const { names } = Piece;
    const randomIndex = Math.random() * names.length;
    // TODO THIS SHOULD BE IN PIECE FACTORY
  };
}

module.exports = withRandomPlacer;
