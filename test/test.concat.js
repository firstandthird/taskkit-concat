'use strict';
const test = require('tape');
const ConcatTask = require('../');
const TaskKitTask = require('taskkit-task');
const fs = require('fs');
const os = require('os');

test('instance of', (t) => {
  t.plan(1);

  const nt = new ConcatTask();

  t.equal(nt instanceof TaskKitTask, true, 'instance of TaskKitTask');
});


test('concats files', (t) => {
  t.plan(3);

  const file = `concat-${new Date().getTime()}.txt`;
  const outpath = `${os.tmpdir()}/${file}`;
  const files = {};
  files[file] = {
    input: ['test/fixtures/one.txt', 'test/fixtures/two.txt']
  };

  const task = new ConcatTask('concat', {
    dist: os.tmpdir(),
    files
  }, {});
  task.execute((err) => {
    t.equal(err, null, 'not erroring');
    t.equal(fs.existsSync(outpath), true, 'file exists');
    t.equal(fs.readFileSync(outpath, 'utf8'), fs.readFileSync('test/expected/output.txt', 'utf8'));
  });
});
