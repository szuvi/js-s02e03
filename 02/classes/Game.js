class Game {
  constructor(pieceFactory, Board, capturesDetector) {
    this.pieceFacory = pieceFactory;
    this.board = new Board();
    this.capturesDetector = capturesDetector;
    this.piecesInPlay = [];
  }

  placePiece(name, color, position) {
    const piece = this.pieceFacory.getPiece(name, color);
    try {
      this.board.placePiece(position, piece);
      piece.position(position);
      this.piecesInPlay.push(piece);
    } catch (e) {
      console.warn(e.message); // TODO possibly change error output
    }
  }

  reportCaptures() {
    const report = this.piecesInPlay.map((piece) =>
      this.capturesDetector.triggerPossibleCaptures(piece)
    );
    report.flat().forEach((line) => console.log(line)); // TODO rxjs or events
  }
}

module.exports = Game;
