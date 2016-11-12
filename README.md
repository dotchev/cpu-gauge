[![npm](https://img.shields.io/npm/v/cpu-gauge.svg)](https://www.npmjs.com/package/cpu-gauge)
[![Build Status](https://travis-ci.org/dotchev/cpu-gauge.svg?branch=master)](https://travis-ci.org/dotchev/cpu-gauge)

# cpu-gauge
Simple CPU usage metering for node

Wraps [process.cpuUsage()](https://nodejs.org/api/process.html#process_process_cpuusage_previousvalue) 
in a simple to use interface.
No need to multiply and divide to get CPU usage percentage.

**Note:** requires Node.js 6.1 or later.

## Install

```sh
npm install --save cpu-gauge
```

## Usage

```js
const gauge = require('cpu-gauge');

var cpu = gauge.start();
// ...
console.log(cpu.usage().percent);
```

**Note** altough node executes JavaScript in a single thread, it uses additional
threads for background tasks. So it is possible that CPU goes well above 100%.

## API

### gauge.start()

Starts metering the CPU usage.
Returns a _cpu_ object.

### cpu.usage()

Resturns CPU usage of current process since _start()_ invocation.
Returned object has the following properties:
* `user` - user CPU time in microseconds
* `system` - system CPU time in microseconds
* `time` - elapsed time in microseconds
* `percent` - CPU usage as percent of a logical core, so it could be above 100
