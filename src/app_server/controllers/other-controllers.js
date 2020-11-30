'use strict';

const aboutModel = {
  title: 'About',
  pageHeader: {
    title: 'About',
    tagline:
      'Loc8r was created to help people find places to sit down and get a bit of work done.'
  }
};

const testModel = {
  title: 'Test',
  pageHeader: {
    title: 'Bootstrap CSS Experiments'
  },
  numbers: [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelves'
  ]
};

const about = (req, res) => {
  res.render('about', aboutModel);
};

const test = (req, res) => {
  res.render('test', testModel);
};

module.exports = {
  about,
  test
};
