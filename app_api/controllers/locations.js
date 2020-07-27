const model = require('../models/db');

// db.model.then( (Location) => {
//   console.log('db.model promise resolved');
//   Location.find(function (err, res) {
//     if (err) return console.error(err);
//     console.log('found these locations:');
//     console.log(res);
//   });
// }).catch( (reason) => {
//   console.log(`connection failed ${reason}`);
// });

model.Location.find(function (err, res) {
    if (err) return console.error(err);
    console.log('found these locations:');
    console.log(res);
  });

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