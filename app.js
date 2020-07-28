'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon')
const logger = require('morgan');
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');
const db = require('./app_api/models/db');

//Does our db layer work? 
db.getLocationModel().then( (Location) => {
  Location.find(function (err, res) {
    if (err) return console.error(err);
    console.log(`# locations: ${res.length}`);
  });
});

const hbs = require('hbs');

hbs.registerHelper('subtract', function(num1, num2) { 
  return num1 - num2;
});

hbs.registerHelper('times', function(count, options) { 
  var accum = '';
  for(var i = 0; i < count; i++)
    accum += options.fn(i);
  return accum;
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res /*not used: next */) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
