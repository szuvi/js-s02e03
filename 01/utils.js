const fs = require('fs');

function loadGameData(callback) {
  fs.readFile('./boardInput.json', {}, (err, boardData) =>
    callback(JSON.parse(boardData)),
  );
}

module.exports = { loadGameData };
