'use strict';
const TaskKitTask = require('taskkit-task');
const async = require('async');
const fs = require('fs');
const os = require('os');

class ConcatTask extends TaskKitTask {

  get description() {
    return 'Concatenates files';
  }

  process(input, filename, done) {

    if (!Array.isArray(input)) {
      input = [input];
    }

    async.map(input, (file, next) => {
      fs.readFile(file, 'utf8', next);
    }, (err, results) => {
      if (err) {
        return done(err);
      }

      this.write(filename, results.join(os.EOL), done);
    });
  }
}
module.exports = ConcatTask;