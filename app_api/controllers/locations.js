'use strict';

const debug = require('debug')('meanwifi:controllers');
const db = require("../models/db");

const locationsList = (req, res) => { 
  db.Location.find( (error, locations) => {
    if (error || !locations) { 
      const msg = "Locations not found";
      console.error(msg);
      return res.status(404).json( { 
        "message": msg, 
        "error": error
      });
    }
    else { 
      return res.status(200).json(locations);
    }
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
  const id = req.params.locationid;

  db.Location.findById(id, (error, location) => { 
    //mongoose returns error when bad ID is provided... 
    if (error || !location) {
      const msg = `error retrieving location '${id}'`;
      console.error(msg);
      return res.status(404).json({ 
        "message": msg,
        "error": error
      });
    }
    else { 
      debug(`success retrieving location '${id}'`);
      return res.status(200).json(location);
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
