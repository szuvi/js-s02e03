module.exports = class Field {
  constructor(position, hintContent) {
    this.position = position;
    this.hintPositionX = Math.floor(+hintContent / 10);
    this.hintPositionY = +hintContent % 10;
  }

  get hint() {
    return [this.hintPositionX, this.hintPositionY];
  }
};
