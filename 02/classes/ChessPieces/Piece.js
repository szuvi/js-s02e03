class Piece {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.pos = null;
    this.moves = {
      types: null,
      limit: false,
    };
  }

  set position(position) {
    this.pos = position;
  }

  get position() {
    return this.pos;
  }

  get notation() {
    return `${Piece.notation[this.name]}${this.color[0]}`;
  }

  triggerCollisionResponse(trigger) {
    return `${this.color} ${this.name} at ${this.position} by ${trigger.name} at ${trigger.position}`;
  }

  static get notation() {
    return {
      king: 'K',
      queen: 'Q',
      bishop: 'B',
      knight: 'N',
      rook: 'R',
    };
  }
}

module.exports = Piece;
