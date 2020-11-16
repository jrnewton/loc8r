'use strict';

const debug = require('debug')('meanwifi:app_controllers');
const model = require('../../app_api/models/static');
const runtime = require('../../runtime');
/* use '.default' otherwise you'll get a tslint warning
   see https://github.com/axios/axios/issues/1975 */
const axios = require('axios').default;

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
  const options = {
    validateStatus: null,
    params: {
      lng: -0.9690884,
      lat: 51.455041,
      maxDistance: 20
    }
  };

  debug('url', url);
  debug('options', options);

  axios
    .get(url, options)
    .then((response) => {
      if (response.status === 200) {
        debug('got 200 from the API');
        renderHomepage(req, res, response.data);
      } else {
        debug('got non-200 from the API', response.status);
        res.status(response.status).json(response.data);
      }
    })
    .catch((error) => {
      debug('caught an error on request to the API', error.message);
      if (error.stack) {
        debug(error.stack);
      }
      res.status(500).json(JSON.stringify(error));
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
