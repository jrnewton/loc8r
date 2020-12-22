'use strict';

const debug = require('debug')('loc8r:models');
const mongoose = require('mongoose');
const dbURI = require('../../runtime').options.dbURI;

//Note to self
//I wanted to restrict my Mongodb Atlas cluster to a whitelist IP list but
//with heroku free-tier that requires using a socks proxy but
//mongoose/mongo does not currently support that type of connection but
//there IS a ticket filed (see https://jira.mongodb.org/browse/CSHARP-734)
//but sadly no real progress is has been made...
const conn = mongoose.createConnection(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports.Connection = conn;

const locations = require('./locations');
const Location = conn.model('Location', locations.schema, 'locations');
module.exports.Location = Location;

module.exports.ready = new Promise((resolve, reject) => {
  conn.catch(() => {
    //console.error(`failed to connect to ${dbURI}`);
    reject(`[${dbURI}] failed to connect`);
  });

  conn.on('connected', () => {
    //debug(`[${dbURI}] Mongoose connected`);
    resolve(`[${dbURI}] Mongoose connected`);
  });
});

conn.on('error', (err) => {
  console.error(`[${dbURI}] Mongoose connection error:`, err);
});

conn.on('disconnected', () => {
  debug(`[${dbURI}] Mongoose disconnected`);
});

const shutdown = (msg, callback) => {
  conn.close(() => {
    debug(`[${dbURI}] Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  shutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  shutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  shutdown('app shutdown', () => {
    process.exit(0);
  });
});
