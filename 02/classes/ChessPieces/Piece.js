class Piece {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.position = null;
    this.moves = {
      types: null,
      limit: false,
    };
  }

  set position([row, column]) {
    this.position = [row, column];
  }

  get position() {
    return this.position;
  }

  triggerCollisionResponse(trigger) {
    return `${this.color} ${this.name} at ${this.position} by ${trigger.name} at ${trigger.position}`;
  }

  static get names() {
    return ['king', 'queen', 'rook', 'knight', 'bishop'];
  }
}

module.exports = Piece;
