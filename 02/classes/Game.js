class Game {
  constructor(pieceFactory, Board, capturesDetector) {
    this.pieceFacory = pieceFactory;
    this.board = new Board();
    this.capturesDetector = capturesDetector;
    this.piecesInPlay = [];
  }

  placePieceManually(name, color, position) {
    const piece = this.pieceFacory.getPiece(name, color);
    this.placePiece(piece, position);
  }

  placeRandom() {
    const randomPiece = this.pieceFacory.getRandomPiece();
    if (this.isPieceInPlay(randomPiece)) {
      this.placeRandom();
    } else {
      const randomPosition = this.board.getRandomPosition();
      this.placePiece(randomPiece, randomPosition);
    }
  }

  placePiece(piece, position) {
    this.board.placePiece(position, piece);
    // eslint-disable-next-line no-param-reassign
    piece.position = position;
    this.piecesInPlay.push(piece);
  }

  isPieceInPlay(targetPiece) {
    return this.piecesInPlay.some(
      (piece) =>
        piece.name === targetPiece.name && piece.color === targetPiece.color
    );
  }

  reportCaptures() {
    const detectorInstance = this.capturesDetector(this.board);
    const report = this.piecesInPlay.map((piece) =>
      detectorInstance.triggerPossibleCaptures(piece)
    );
    report.flat().forEach((line) => console.log(line)); // TODO possibly change way of handling output
  }
}

module.exports = Game;
