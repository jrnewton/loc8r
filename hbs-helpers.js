'use strict';

const debug = require('debug')('meanwifi:hbs-helpers');
const hbs = require('hbs');

hbs.registerHelper('subtract', function(num1, num2) { 
  debug('subtract: ', num1, num2);
  return num1 - num2;
});

hbs.registerHelper('times', function(count, options) { 
  debug('times: ', count);
  var accum = '';
  for(var i = 0; i < count; i++)
    accum += options.fn(i);
  return accum;
});