//const mongoose = require('mongoose');
// const schema = require('./locations');
// const Location = conn.model('Location', schema.location, 'locations');

const dummyHandler = (req, res) => {
  res
    .status(200)
    .json({"status" : "success"});
}

const locationsListByDistance = (req, res) => { 
  res
    .status(200)
    .json({"status" : "success"});
};
const locationsCreate = (req, res) => { 
  res
    .status(200)
    .json({"status" : "success"});
};
const locationsReadOne = (req, res) => { 
  

  res
    .status(200)
    .json({"status" : "success"});
};
const locationsUpdateOne = (req, res) => { 
  res
    .status(200)
    .json({"status" : "success"});
};
const locationsDeleteOne = (req, res) => { 
  res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};