const { map, concatMap } = require('rxjs/operators');
const utils = require('../utils');
const Board = require('./Board');
const Solver = require('./Solver');

module.exports = class Game {
  init(inputPath) {
    this.gameResultsSubscription$ = utils.loadGameData$(inputPath).pipe(
      map((fileData) => new Board(fileData)),
      map((board) => new Solver(board, [0, 0])),
      concatMap((solver) => solver.solve$()),
    );
  }

  start(outputFunction) {
    this.gameResultsSubscription$.subscribe(outputFunction);
  }
};
