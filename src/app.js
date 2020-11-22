'use strict';

const debug = require('debug')('meanwifi:server');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');
const db = require('./app_api/models/db');

//Does our db layer work?
db.Location.find((err, res) => {
  if (err) return console.error(err);
  debug(`# of locations = ${res.length}`);
});

const app = express();

// view engine setup

require('./hbs-helpers');
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../assets')));

app.use(favicon(path.join(__dirname, '../assets', 'favicon.ico')));
app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.ready = db.ready;
app.dbConnection = db.Connection;
module.exports = app;
