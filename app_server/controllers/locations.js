'use strict';

const debug = require('debug')('meanwifi:controllers');
const model = require('../../app_api/models/static');
const runtime = require('../../runtime');
const axios = require('axios');

const renderHomepage = (req, res, body) => {
  /* locations-list is locations-list.hbs which is rendered inside of layout.hbs */
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',

    pageHeader: {
      title: 'Loc8r',
      tagline: 'Find places to work with wifi near you!'
    },

    locations: body
  });
};

const homeList = (req, res) => {
  const url = `${runtime.options.serviceRootURL}/api/locationsbygeo`;
  axios
    .get(url, {
      params: {
        lng: -0.9690884,
        lat: 51.455041,
        maxDistance: 200
      }
    })
    .then((response) => {
      if (response.status === 200) {
        renderHomepage(req, res, response.data);
      } else {
        res.status(response.status).json(response.data);
      }
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
};

const locationInfo = (req, res) => {
  const locationId = req.query.id;
  if (locationId) {
    debug(`path=${req.path}; location id=${locationId}`);
    const location = model.locations[locationId];
    if (location) {
      res.render('location-info', {
        title: 'Loc8r - Location Info - ' + location.name,
        pageHeader: {
          title: 'Loc8r',
          tagline: 'Find places to work with wifi near you!'
        },
        location: location,
        gsm_key: process.env.GSM_KEY
      });
    } else {
      console.error(`path=${req.path}; location id ${locationId} not found`);
      res.status(404).send('Location not found');
    }
  } else {
    console.error(`path=${req.path}; missing location id`);
    res.status(404).send('Location id required');
  }
};

const addReview = (req, res) => {
  res.render('location-review', { title: 'Loc8r - Add Review' });
};

module.exports = {
  homeList,
  locationInfo,
  addReview
};
