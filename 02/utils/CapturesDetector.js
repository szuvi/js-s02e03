/* eslint-disable no-use-before-define */
const moves = require('./movesModifiers');

const CapturesDetector = (function detectorModuleIIFE() {
  let board;

  const captureFunctions = {
    straight: getLineCaptures,
    diagonal: getDiagonalCaptures,
    knight: getKnightCaptures,
  };

  function triggerPossibleCaptures(piece) {
    const report = getPossibleCaptures(piece).map((capture) =>
      capture.triggerCollisionResponse(piece)
    );
    return report;
  }

  function getPossibleCaptures(piece) {
    const captureGetters = getCapturesFunctions(piece.moves);
    const captures = captureGetters.map((captureFunction) =>
      captureFunction(piece)
    );
    return captures;
  }

  function getCapturesFunctions({ type: moveType }) {
    if (Array.isArray(moveType)) {
      return moveType.map((move) => captureFunctions[move]);
    }
    return [captureFunctions[moveType]];
  }

  function getLineCaptures(piece) {
    const modifiers = moves.lineModifiers(piece.position);
    return getCapturesByModifiers(modifiers, piece);
  }

  function getDiagonalCaptures(piece) {
    const modifiers = moves.diagonalModifiers(piece.position);
    return getCapturesByModifiers(modifiers, piece);
  }

  function getKnightCaptures(piece) {
    const modifiers = moves.knightModifiers(piece.position);
    return getCapturesByModifiers(modifiers, piece);
  }

  function getCapturesByModifiers(modifiers, piece) {
    return Object.values(modifiers)
      .map((modifier) => getSingleDirectionCapture(piece, modifier))
      .filter((capture) => capture != null);
  }

  function getSingleDirectionCapture(piece, directionMod) {
    if (piece.moves.limit === true) {
      return getLimitedSingleCapture(piece, directionMod);
    }
    return getLoopedSingleCapture(piece, directionMod);
  }

  function getLimitedSingleCapture(piece, directionMod) {
    const currPosition = directionMod(piece.position);
    if (isInBounds(currPosition)) {
      return getCapture(currPosition, piece);
    }
    return null;
  }

  function getLoopedSingleCapture(piece, directionMod) {
    for (
      let currPosition = directionMod(piece.position);
      isInBounds(currPosition);
      directionMod(currPosition)
    ) {
      if (board.isFieldOccupied(currPosition)) {
        return getCapture(currPosition, piece);
      }
    }
    return null;
  }

  function isInBounds([row, column]) {
    return row >= 0 && row < 8 && column >= 0 && column < 8;
  }

  function getCapture(targetPosition, piece) {
    const targetPiece = board.getPiece(targetPosition);
    if (targetPiece.color !== piece.color) {
      return targetPiece;
    }
    return null;
  }

  return function initPublicAPI(inputBoard) {
    board = inputBoard;
    return {
      getPossibleCaptures,
      triggerPossibleCaptures,
    };
  };
})();

module.exports = CapturesDetector;
