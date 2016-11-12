'use strict';

const tap = require('tap');
const sinon = require('sinon');
const clockit = require('clockit');
const gauge = require('.');

tap.test('stub CPU & time', (t) => {
  var sandbox = sinon.sandbox.create();
  sandbox.stub(process, 'cpuUsage');
  sandbox.stub(clockit, 'start');
  t.tearDown(() => sandbox.restore());

  process.cpuUsage.returns({ user: 100, system: 51 });
  clockit.start.returns({ us: 200 });

  var cpu = gauge.start();
  t.strictSame(cpu.usage(), {
    user: 100,
    system: 51,
    time: 200,
    percent: 75.5
  });

  t.end();
});

tap.test('busy', (t) => {
  var json = require('./package.json');
  var cpu = gauge.start();
  for (var i = 0; i < 1000; ++i) {
    JSON.parse(JSON.stringify(json));
  }
  var usage = cpu.usage();
  t.ok(usage.percent > 50, usage);
  t.end();
});

tap.test('idle', (t) => {
  var cpu = gauge.start();
  setTimeout(() => {
    var usage = cpu.usage();
    t.ok(usage.percent < 50, usage);
    t.end();
  }, 10);
});
