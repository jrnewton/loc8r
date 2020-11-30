'use strict';

const debug = require('debug')('meanwifi:app_controllers');
const runtime = require('../../runtime');
/* use '.default' otherwise you'll get a tslint warning
   see https://github.com/axios/axios/issues/1975 */
const axios = require('axios').default;

const formatDistance = (distanceMeters) => {
  let displayDistance = '';
  if (distanceMeters > 1000) {
    displayDistance = (distanceMeters / 1000).toFixed(1) + 'km';
  } else {
    displayDistance = Math.floor(distanceMeters) + 'm';
  }
  return displayDistance;
};

const getResponseId = (response) => {
  return `${response.request.method} ${response.request.path}`;
};

const processResponse = (req, res, response, renderCallback) => {
  debug(`got ${response.status} from ${getResponseId(response)}`);

  if (response.status === 200) {
    //when status is 200 response.data will always be a non-empty array
    renderCallback(req, res, response.data, null);
  } else {
    let message = '';

    if (response.status === 404) {
      message = 'No results found';
    } else {
      message = '' + response.status;
      if (response.data.message) {
        message = message + ': ' + response.data.message;
      }
    }

    renderCallback(req, res, null, message);
  }
};

const renderHomepage = (req, res, body, message) => {
  if (body) {
    body.map((item) => {
      item.distance = formatDistance(item.distance);
      return item;
    });
  }

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

const renderLocationDetail = (req, res, location, message) => {
  let title = 'Loc8r - Location Info';
  if (location) {
    title = `${title} - ${location.name}`;
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

const renderError = (req, res, error, renderCallback) => {
  debug(`caught error from ${getResponseId(error.response)}`, error.message);

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

  if (req.query.test === 'true') {
    options.params.lng = 0;
    options.params.lat = 0;
  }

  debug('url', url);
  debug('options', options);

  const callback = renderHomepage;

  axios
    .get(url, options)
    .then((response) => {
      processResponse(req, res, response, callback);
    })
    .catch((error) => {
      renderError(req, res, error, callback);
    });
};

const locationInfo = (req, res) => {
  const locationId = req.query.id;
  debug(`path=${req.path}; location id=${locationId}`);

  const url = `${runtime.options.serviceRootURL}/api/locations/${locationId}`;

  const callback = renderLocationDetail;
  axios
    .get(url, { validateStatus: null })
    .then((response) => {
      processResponse(req, res, response, callback);
    })
    .catch((error) => {
      renderError(req, res, error, callback);
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
