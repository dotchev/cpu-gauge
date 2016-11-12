'use strict';

const clockit = require('clockit');

exports.start = function() {
  const timer = clockit.start();
  const startCpu = process.cpuUsage();
  return {
    usage() {
      const cpu = process.cpuUsage(startCpu);
      const time = timer.us;
      return Object.assign(cpu, {
        time,
        percent: (cpu.system + cpu.user) / time * 100
      });
    }
  };
}
