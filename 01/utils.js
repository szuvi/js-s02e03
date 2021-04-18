/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
const fs = require('fs');
const { Observable } = require('rxjs');

function loadGameData$(filePath) {
  return new Observable((subscriber) => {
    fs.readFile(filePath, {}, (err, boardData) => {
      if (err) {
        subscriber.error(`Error loading file: ${err}`);
      }
      subscriber.next(JSON.parse(boardData));
      subscriber.complete();
    });
  });
}

function getLoggingObserver() {
  return {
    next: log,
    error: log,
  };
}

function log(input) {
  if (typeof input === 'object') {
    console.table(input);
  } else {
    console.log(input);
  }
}

module.exports = { loadGameData$, getLoggingObserver };
