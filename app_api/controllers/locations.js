'use strict';

const db = require("../models/db");

const locationsList = (req, res) => { 
  db.Location.find( (error, locations) => {
    if (error) { 
      return res.status(404).json(error);
    }

    res.status(200).json(locations);
  });
};
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
  let id = req.params.locationid;
  db.Location.findById(id, (error, location) => { 
    //mongoose returns error when bad ID is provided... 
    if (error || !location) {
      res.status(404).json({ 
        "message": `error retrieving location ${id}`,
        "error": error
      });
    }
    else { 
      console.log('loc found');
      res.status(200).json(location);
    }
  });
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
  locationsList,
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};