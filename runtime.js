'use strict';

const debug = require('debug')('meanwifi:server');

let dbURI = 'mongodb://localhost/loc8r';
let readOnly = false;

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
  readOnly = true;
}

//For testing readOnly flag
if (process.env.NODE_ENV && process.env.NODE_ENV === 'ro') {
  readOnly = true;
}

const port = normalizePort(process.env.PORT || '3000');
const serviceRootURL = `http://localhost:${port}`;

const options = {
  port: port,
  serviceRootURL: serviceRootURL,
  dbURI: dbURI,
  readOnly: readOnly
};
module.exports.options = options;

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
  debug('runtime options:', options);
}
