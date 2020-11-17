'use strict';

const debug = require('debug')('meanwifi:app_controllers');
const runtime = require('../../runtime');
/* use '.default' otherwise you'll get a tslint warning
   see https://github.com/axios/axios/issues/1975 */
const axios = require('axios').default;

const renderHomepage = (req, res, body, message) => {
  /* locations-list is locations-list.hbs which is rendered inside of layout.hbs */
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',

    pageHeader: {
      title: 'Loc8r',
      tagline: 'Find places to work with wifi near you!'
    },

    locations: body,
    message: message
  });
};

const formatDistance = (distanceMeters) => {
  let displayDistance = '';
  if (distanceMeters > 1000) {
    displayDistance = parseFloat(distanceMeters / 1000).toFixed(1) + 'km';
  } else {
    displayDistance = Math.floor(distanceMeters) + 'm';
  }
  return displayDistance;
};

const renderError = (req, res, error, renderCallback) => {
  debug('caught an error on request to the API', error.message);

  if (error.stack) {
    debug(error.stack);
  }

  renderCallback(req, res, null, `Internal server error ${error.message}`);
};

const homeList = (req, res) => {
  const url = `${runtime.options.serviceRootURL}/api/locationsbygeo`;
  const options = {
    validateStatus: null,
    params: {
      lng: -0.7992599,
      lat: 51.378091,
      maxDistance: 20 * 1000 //API uses meters
    }
  };

  debug('url', url);
  debug('options', options);

  axios
    .get(url, options)
    .then((response) => {
      if (response.status === 200) {
        debug('got 200 from the API');
        //when status is 200 then data will always be a non-empty array
        response.data.map((item) => {
          item.distance = formatDistance(item.distance);
          return item;
        });
        renderHomepage(req, res, response.data, null);
      } else if (response.status === 404) {
        renderHomepage(req, res, null, 'No results found');
      } else {
        debug('got non-200 from the API', response.status);

        let message = '' + response.status;
        if (response.data.message) {
          message = message + ': ' + response.data.message;
        }

        renderHomepage(req, res, null, message);
      }
    })
    .catch((error) => {
      renderError(req, res, error, renderHomepage);
    });
};

const renderLocation = (req, res, location, message) => {
  res.render('location-info', {
    title: 'Loc8r - Location Info - ' + location.name,
    pageHeader: {
      title: 'Loc8r',
      tagline: 'Find places to work with wifi near you!'
    },
    location: location,
    gsm_key: process.env.GSM_KEY,
    message: message
  });
};

const locationInfo = (req, res) => {
  const locationId = req.query.id;
  debug(`path=${req.path}; location id=${locationId}`);

  const url = `${runtime.options.serviceRootURL}/api/locations/${locationId}`;

  axios
    .get(url, { validateStatus: null })
    .then((response) => {
      if (response.status === 200) {
        renderLocation(req, res, response.data, null);
      } else if (response.status === 404) {
        renderLocation(req, res, null, 'Location not found');
      } else {
        debug('got non-200 from the API', response.status);

        let message = '' + response.status;
        if (response.data.message) {
          message = message + ': ' + response.data.message;
        }

        renderLocation(req, res, null, message);
      }
    })
    .catch((error) => {
      renderError(req, res, error, renderLocation);
    });
};

const addReview = (req, res) => {
  res.render('location-review', { title: 'Loc8r - Add Review' });
};

module.exports = {
  homeList,
  locationInfo,
  addReview
};
