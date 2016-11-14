'use strict';

if (!process.cpuUsage) return;

const clockit = require('clockit');

exports.start = function() {
  const timer = clockit.start();
  const startCpu = process.cpuUsage();
  return {
    usage() {
      const u = process.cpuUsage(startCpu);
      u.time = timer.us;
      u.percent = (u.system + u.user) / u.time * 100;
      return u;
    }
  };
}
