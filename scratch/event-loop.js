'use strict';

const http = require('http');

const main = () => { 

  /* 
    https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
    timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
    pending callbacks: executes I/O callbacks deferred to the next loop iteration.
    poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
    check: setImmediate() callbacks are invoked here.
    close callbacks: some close callbacks, e.g. socket.on('close', ...).
  */
  console.log('call to main');

  const req = http.get('http://nodejs.org/dist/index.json', (res) => {
    console.log('network IO callback');
  });

  new Promise((res, rej) => { 
    res('promise callback');
  }).then((msg) => { 
    console.log(msg);
  });

  let t1 = Math.random() * 1000;
  setTimeout(() => { 
    console.log('setTimeout callback after', t1, 'ms');
  }, t1);

  let t2 = Math.random() * 1000;
  setInterval(() => { 
    console.log('setInterval callback after', t2, 'ms');
  }, t2);

  setImmediate(() => { 
    console.log('setImmediate callback');
  });

  req.on('close', () => { 
    console.log('close event callback');
  });
};

let i = 0;
while (true) {
  console.log('iteration', i++);
  main();
  if (i > 2) { 
    return;
  }
}
