// Chess board. Program is to choose at random one of the chess piece
// (except the pawn) and place it at the random spot on the board.
// After placing any piece (except first one) check all present
// pieces move ranges and see if any can reach other piece.
// If so Give that pieces position and quit program.
// FACTORY (with class hierarhy) + SINGLETON pattern

const Game = require('./classes/Game');
const ChessBoard = require('./classes/ChessBoard');
const pieceFacory = require('./classes/ChessPieces/PieceFactory');
const capturesDetector = require('./utils/CapturesDetector');

const myPieceFactory = pieceFacory.getInstance();

const myGame = new Game(myPieceFactory, ChessBoard, capturesDetector);

for (let i = 0; i < 10; i += 1) {
  myGame.placeRandom();
}
myGame.board.display();
myGame.reportCaptures();
