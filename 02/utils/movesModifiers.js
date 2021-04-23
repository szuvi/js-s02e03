const rowModifier = ([row, column], step) => [row, column + step];
const columnModifier = ([row, column], step) => [row + step, column];

const lineModifiers = {
  left: (position) => rowModifier(position, -1),
  right: (position) => rowModifier(position, +1),
  up: (position) => columnModifier(position, -1),
  down: (position) => columnModifier(position, +1),
};

const diagonalModifiers = {
  leftUp: (position) => rowModifier(columnModifier(position, -1), -1),
  rightUp: (position) => rowModifier(columnModifier(position, -1), +1),
  leftDown: (position) => rowModifier(columnModifier(position, +1), -1),
  rightDown: (position) => rowModifier(columnModifier(position, -1), +1),
};

const knightModifiers = {
  leftUp: (position) => rowModifier(columnModifier(position, -1), -2),
  rightUp: (position) => rowModifier(columnModifier(position, -1), +2),
  leftDown: (position) => rowModifier(columnModifier(position, +1), -2),
  rightDown: (position) => rowModifier(columnModifier(position, -1), +2),
  upLeft: (position) => rowModifier(columnModifier(position, -2), -1),
  upRight: (position) => rowModifier(columnModifier(position, -2), +1),
  downLeft: (position) => rowModifier(columnModifier(position, +2), -1),
  downRight: (position) => rowModifier(columnModifier(position, -2), +1),
};

module.exports = { lineModifiers, diagonalModifiers, knightModifiers };
