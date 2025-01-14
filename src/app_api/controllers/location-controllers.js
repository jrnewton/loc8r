'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('loc8r:api_controllers');
const db = require('../models/db');

function validateParam(paramName, paramValue, res) {
  debug(`validateParam: ${paramName}=${paramValue}`);

  if (!paramValue && paramValue !== 0) {
    res.status(400).json({
      message: `Param '${paramName}' required`
    });
    return false;
  } else {
    return true;
  }
}

const locationsList = (req, res) => {
  debug('locationsList');

  db.Location.find((error, locations) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else {
      if (locations && locations.length !== 0) {
        return res.status(200).json(locations);
      } else {
        return res.status(404).end();
      }
    }
  });
};

const locationsListByDistance = (req, res) => {
  debug(`locationsListByDistance params=${JSON.stringify(req.query)}`);

  //URL format: api/locations?lng=-0.7992599&lat=51.378091&maxDistance=20000
  const lng = parseFloat(req.query.lng);
  if (!validateParam('lng', lng, res)) {
    return;
  }

  const lat = parseFloat(req.query.lat);
  if (!validateParam('lat', lat, res)) {
    return;
  }

  const maxDistanceMeters = parseInt(req.query.maxDistance);
  if (!validateParam('maxDistance', maxDistanceMeters, res)) {
    return;
  }

  const limit = 10;

  const near = {
    type: 'Point',
    coordinates: [lng, lat]
  };

  /*
    You’re using spherical: true here because it causes
    MongoDB to use $nearSphere semantics, which
    calculates distances using spherical geometry.
    If this were false, it would use 2D geometry. 
  */
  const geoOptions = {
    distanceField: 'distance.calculated',
    spherical: true,
    //mongodb stores geo data in meters
    maxDistance: maxDistanceMeters

    /*  Note: Starting in version 4.2, MongoDB removes the limit 
        and num options for the $geoNear stage as well as the default 
        limit of 100 documents. To limit the results of $geoNear, use 
        the $geoNear stage with the $limit stage. */
    //limit: limit
  };

  const aggOptions = [{ $geoNear: { near, ...geoOptions } }, { $limit: limit }];
  debug(
    `locationsListByDistance aggregateOptions=${JSON.stringify(aggOptions)}`
  );

  try {
    db.Location.aggregate(aggOptions, (error, locations) => {
      if (error) {
        debug('aggregate returned an error', error);
        /* If you pass the entire error object then the error.message property is
            not included in JSON.stringify output.  
            Why? It's type and value doesn't fall into any of the cases where stringify 
            would drop it on the floor...  */
        return res.status(500).json({
          message: error.message
        });
      } else {
        if (locations && locations.length > 0) {
          debug('aggregate returned results', locations.length);
          locations = locations.map((result) => {
            result.distance = result.distance.calculated;
            result.id = result._id;
            return result;
            // return {
            //   id: result._id,
            //   name: result.name,
            //   address: result.address,
            //   rating: result.rating,
            //   facilities: result.facilities,
            //   distance: result.distance.calculated
            // };
          });
          return res.status(200).json(locations);
        } else {
          debug('aggregate returned no results');
          return res.status(404).end();
        }
      }
    });
  } catch (error) {
    debug('aggregate threw an error', error);
    return res.status(500).json({
      message: error.message
    });
  }
};

function createOrUpdateLocation(req, existingLocation) {
  if (!existingLocation) {
    existingLocation = {};
    debug('creating new location');
  }

  if (req.body.name) {
    existingLocation.name = req.body.name;
  }

  if (req.body.address) {
    existingLocation.address = req.body.address;
  }

  if (req.body.facilities) {
    existingLocation.facilities = req.body.facilities.split(',');
  }

  if (req.body.lng && req.body.lat) {
    existingLocation.coords = {
      type: 'Point',
      coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    };
  }

  if (req.body.days1) {
    existingLocation.openingHours = [];
    existingLocation.openingHours.push({
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1
    });

    if (req.body.days2) {
      existingLocation.openingHours.push({
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      });
    }
  }

  debug(`createOrUpdateLocation: ${existingLocation.name}`);

  return existingLocation;
}

const locationsCreate = (req, res) => {
  const newLocation = createOrUpdateLocation(req);
  debug(`locationsCreate name=${newLocation.name}`);

  db.Location.create(newLocation, (error, location) => {
    if (error) {
      return res.status(400).json(error.message);
    } else {
      return res.status(201).json(location);
    }
  });
};

const locationsReadOne = (req, res) => {
  const id = req.params.locationid;
  //Validate the id with mongo, otherwise findById returns an error (instead of null result)
  //I want to differntiate that type of error with something more severe...
  const valid = mongoose.isValidObjectId(id);
  debug(`locationsReadOne id='${id}', valid=${valid}`);

  if (!valid) {
    return res.status(404).json({ message: 'location id not valid' });
  }

  db.Location.findById(id, (error, location) => {
    //mongoose returns error when bad ID is provided...
    if (error) {
      return res.status(500).json({ message: error.message });
    } else if (!location) {
      return res.status(404).json({ message: 'location not found' });
    } else {
      return res.status(200).json(location);
    }
  });
};

const locationsUpdateOne = (req, res) => {
  const id = req.params.locationid;
  const valid = mongoose.isValidObjectId(id);
  debug(`locationsUpdateOne id='${id}', valid=${valid}`);

  if (!valid) {
    return res.status(404).json({ message: 'location id not valid' });
  }

  db.Location.findById(id)
    .select('-reviews -rating')
    .exec((error, location) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      } else if (!location) {
        return res.status(404).json({ message: 'location not found' });
      } else {
        const updatedLocation = createOrUpdateLocation(req, location);
        updatedLocation.save((error, location) => {
          if (error) {
            return res.status(500).json({ message: error.message });
          } else if (!location) {
            return res.status(404).json({ message: 'location not found' });
          } else {
            return res.status(200).json(location);
          }
        });
      }
    });
};

const locationsDeleteOne = (req, res) => {
  const id = req.params.locationid;

  const valid = mongoose.isValidObjectId(id);
  debug(`locationsDeleteOne id='${id}', valid=${valid}`);

  if (!valid) {
    return res.status(404).json({ message: 'location id not valid' });
  }

  db.Location.findByIdAndDelete(id, (error, location) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    } else if (!location) {
      return res.status(404).json({ message: 'location not found' });
    } else {
      return res.status(204).end();
    }
  });
};

module.exports = {
  locationsList,
  locationsListByDistance,
  locationsCreate,
  locationsReadOne,
  locationsUpdateOne,
  locationsDeleteOne
};
