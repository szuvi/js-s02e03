/* eslint-disable no-use-before-define */
/* eslint-disable no-irregular-whitespace */
//                   +-------------------------+
//                   ¦ 34 ¦ 21 ¦ 32 ¦ 41 ¦ 25  ¦
//                   +----+----+----+----+-----¦
//                   ¦ 14 ¦ 42 ¦ 43 ¦ 14 ¦ 31  ¦
//                   +----+----+----+----+-----¦
//                   ¦ 54 ¦ 45 ¦ 52 ¦ 42 ¦ 23  ¦
//                   +----+----+----+----+-----¦
//                   ¦ 33 ¦ 15 ¦ 51 ¦ 31 ¦ 35  ¦
//                   +----+----+----+----+-----¦
//                   ¦ 21 ¦ 52 ¦ 33 ¦ 13 ¦ 23  ¦
//                   +-------------------------+
// Do you like treasure hunts? In this problem you are to write a program to explore the above array for a treasure.
// The values in the array are clues. Each cell contains an integer between 11 and 55; for each value the ten's digit
// represents the row number and the unit's digit represents the column number of the cell containing the next clue.
// Starting in the upper left corner (at 1,1), use the clues to guide your search of the array.
// (The first three clues are 11, 34, 42). The treasure is a cell whose value is the same as its coordinates.
// Your program should output the cells it visits during its search, and a message indicating where you found the treasure.

// class board
// class field?
// class solver/jumper

// json > matrix > map > new field >
const utils = require('./utils');
const EventEmitter = require('events');
const Board = require('./classes/Board');
const Game = require('./classes/Game');
const Solver = require('./classes/Solver');

const localEvents = new EventEmitter();

utils.loadGameData((boardData) => localEvents.emit('fileLoaded', boardData));

localEvents.on('fileLoaded', (boardData) => Game.init(new Board(boardData)));
localEvents.on('gameInitialized', () => Game.solve(new Solver()));
