'use strict';

const express = require('express');
const http = require('http');

const app = express();

const getRoot = async (req, res) => { 
  res.status(200).json('hello').end();
};

app.use('/', getRoot);

const server = http.createServer(app);
server.listen(3000);

server.on('listening', () => {
  console.log('server start');
});