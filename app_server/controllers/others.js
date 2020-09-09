'use strict';

const model = require("../../app_api/models/static.js");

const about = (req, res) => { 
  res.render('about', model.about);
};

const test = (req, res) => { 
  res.render('test', model.test);
};

module.exports = {
  about, 
  test
};
