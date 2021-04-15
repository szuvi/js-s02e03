const fs = require('fs');
const { Observable } = require('rxjs');

function loadGameData$(filePath) {
  return new Observable((subscriber) => {
    fs.readFile(filePath, {}, (err, boardData) => {
      if (err) {
        subscriber.err(`Error loading file: ${err}`);
      }
      subscriber.next(JSON.parse(boardData));
      subscriber.complete();
    });
  });
}

module.exports = { loadGameData$ };
