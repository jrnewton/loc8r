'use strict';

const debug = require('debug')('meanwifi:server');

let dbURI = 'mongodb://localhost/loc8r';
let readOnly = false;

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
  readOnly = true;
}

const port = normalizePort(process.env.PORT || '3000');

module.exports.port = port;
module.exports.dbURI = dbURI;
module.exports.readOnly = readOnly;
module.exports.printOptions = printOptions;

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function printOptions() { 
  debug('runtime options:', module.exports);
}
