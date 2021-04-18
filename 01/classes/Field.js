module.exports = class Field {
  constructor(position, hintContent) {
    this.position = position;
    this.hintPositionX = Math.floor(+hintContent / 10) - 1;
    this.hintPositionY = (+hintContent % 10) - 1;
  }

  get hint() {
    return [this.hintPositionX, this.hintPositionY];
  }

  get hintReadable() {
    return [this.hintPositionX + 1, this.hintPositionY + 1];
  }

  get positionReadable() {
    return [this.position[0] + 1, this.position[1] + 1];
  }
};
