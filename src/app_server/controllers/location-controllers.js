'use strict';

const debug = require('debug')('meanwifi:app_controllers');
const service = require('../services/location-services');

const formatDistance = (distanceMeters) => {
  let displayDistance = '';
  if (distanceMeters > 1000) {
    displayDistance = (distanceMeters / 1000).toFixed(1) + 'km';
  } else {
    displayDistance = Math.floor(distanceMeters) + 'm';
  }
  return displayDistance;
};

const homeList = async (req, res) => {
  let locations = null;
  let message = null;

  try {
    locations = await service.getLocationList(
      {
        lng: -0.7992599,
        lat: 51.378091,
        maxDistance: 20 * 1000 //API uses meters
      },
      req.query.test
    );
  } catch (error) {
    message = error.message;
  }

  if (locations) {
    locations.map((item) => {
      item.distance = formatDistance(item.distance);
      return item;
    });
  } else {
    message = 'Sorry but there are no locations near you';
  }

  /* locations-list is locations-list.hbs which is rendered inside of layout.hbs */
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',

    pageHeader: {
      title: 'Loc8r',
      tagline: 'Find places to work with wifi near you!'
    },

    locations: locations,
    message: message
  });
};

const locationInfo = async (req, res) => {
  const locationId = req.query.id;
  debug(`path=${req.path}; location id=${locationId}`);

  let location = null;
  let message = null;

  try {
    location = await service.getSingleLocation(locationId);
  } catch (error) {
    message = error;
  }

  let title = 'Loc8r - Location Info';
  if (location) {
    title = `${title} - ${location.name}`;
  } else {
    title = '404 not found';
    message = '404 not found';
  }

  res.render('location-info', {
    title: title,
    pageHeader: {
      title: 'Loc8r',
      tagline: 'Find places to work with wifi near you!'
    },
    location: location,
    gsm_key: process.env.GSM_KEY,
    message: message
  });
};

const addReview = (req, res) => {
  res.render('location-review', {
    title: 'Loc8r - Add a Review',
    pageHeader: {
      title: 'Add a Review'
    },
    id: req.query.id
  });
};

const saveReview = async (req, res) => {
  let { id, name, rating, text } = req.body;

  debug(`path=${req.path}; location id=${id}`);

  let review = {
    author: name,
    rating: rating,
    reviewText: text
  };

  let message = null;

  try {
    review = await service.addReview(id, review);
  } catch (error) {
    message = error;
  }

  res.render('location-review', {
    title: 'Loc8r - Thanks for submitting a Review!',
    pageHeader: {
      title: 'Thanks!'
    },
    id: req.query.id,
    review: review,
    message: message
  });
};

module.exports = {
  homeList,
  locationInfo,
  addReview,
  saveReview
};
