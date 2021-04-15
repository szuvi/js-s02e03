/* eslint-disable no-use-before-define */
const { Observable } = require('rxjs');
const Board = require('./Board');
const AugumentedArray = require('./AugumentedArray');

module.exports = class Solver {
  constructor(board, initialPosition) {
    if (!argumentsVerified(board, initialPosition)) {
      throw new Error('Incorrect arguments.');
    }
    this.board = board;
    this.initialPosition = initialPosition;
    this.currentField = null;
    this.isWinner = false;

    function argumentsVerified(sourceBoard, position) {
      return (
        sourceBoard instanceof Board &&
        Array.isArray(position) &&
        AugumentedArray.isArrayOfNumbers(position)
      );
    }
  }

  solve$() {
    return new Observable((subscriber) => {
      while (!this.isWinner) {
        this.setNextField();
        this.updateWinnerStatus();
        this.generateResponse(subscriber);
      }
    });
  }

  setNextField() {
    if (this.currentField == null) {
      this.currentField = this.board.getField(this.initialPosition);
    }
    const nextPosition = this.currentField.hint;
    this.currentField = this.board.getField(nextPosition);
  }

  updateWinnerStatus() {
    const [currentX, currentY] = this.currentField.position;
    const [hintX, hintY] = this.currentField.hint;
    this.isWinner = currentX === hintX && currentY === hintY;
  }

  generateResponse(subscriber) {
    this.streamGenericResponse(subscriber);
    this.streamHintResponse(subscriber);
    if (this.isWinner) {
      subscriber.complete('Treasure hunt is over!');
    }
  }

  streamGenericResponse(subscriber) {
    subscriber.next(
      `Solver jumped to field ${this.currentField.position} and found a hint.`,
    );
  }

  streamHintResponse(subscriber) {
    subscriber.next(
      `The hint says the next field is ${this.currentField.hint}. ${
        this.isWinner ? "That's my field!" : 'Solver went on.'
      }`,
    );
  }
};
