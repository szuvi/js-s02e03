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
    this.initialPositionReadable = [
      initialPosition[0] + 1,
      initialPosition[1] + 1,
    ];
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
      this.streamInitialResponese(subscriber);
      while (!this.isWinner) {
        this.setNextField();
        this.updateWinnerStatus();
        this.streamResponse(subscriber);
      }
    });
  }

  streamInitialResponese(subscriber) {
    const initialField = this.board.getField(this.initialPosition);
    subscriber.next('Solver starts the teasure hunt!');
    subscriber.next(
      `The journey starts at ${this.initialPositionReadable} where Solver finds first hint: ${initialField.hintReadable}.`
    );
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

  streamResponse(subscriber) {
    this.streamGenericResponse(subscriber);
    this.streamHintResponse(subscriber);
    if (this.isWinner) {
      subscriber.complete();
    }
  }

  streamGenericResponse(subscriber) {
    subscriber.next(
      `Solver jumps to field ${this.currentField.positionReadable} and finds another hint.`
    );
  }

  streamHintResponse(subscriber) {
    subscriber.next(
      `The hint says the next field is at ${this.currentField.hintReadable}. ${
        this.isWinner
          ? "That's my field! Solver grabs a shovel and starts digging..."
          : 'Solver goes on.'
      }`
    );
  }
};
