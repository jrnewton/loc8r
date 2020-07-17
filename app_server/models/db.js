const mongoose = require('mongoose');
require('./locations');

const dbURI = 'mongodb://localhost/loc8r';
const modelDB = mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

modelDB.on('connected', () => {
  console.log(`[${dbURI}] Mongoose connected`);
});

modelDB.on('error', err => {
  console.log(`[${dbURI}] Mongoose connection error:`, err);
});

modelDB.on('disconnected', () => {
  console.log(`[${dbURI}] Mongoose disconnected`);
});

const shutdown = (msg, callback) => { 
  modelDB.close( () => {
    console.log(`[${dbURI}] Mongoose disconnected through ${msg}`);
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