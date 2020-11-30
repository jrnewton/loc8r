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

const getAPIResponseId = (response) => {
  return `${response.request.method} ${response.request.path}`;
};

const processAPIResponse = (req, res, apiResponse, renderCallback) => {
  debug(`got ${apiResponse.status} from ${getAPIResponseId(apiResponse)}`);

  if (apiResponse.status === 200) {
    //when status is 200 response.data will always be a non-empty array
    renderCallback(req, res, apiResponse.data, null);
  } else {
    let message = '';

    if (apiResponse.status === 404) {
      message = 'No results found';
    } else {
      message = '' + apiResponse.status;
      if (apiResponse.data.message) {
        message = message + ': ' + apiResponse.data.message;
      }
    }

    renderCallback(req, res, null, message);
  }
};

const renderHomepage = (req, res, apiResponseBody, message) => {
  if (apiResponseBody) {
    apiResponseBody.map((item) => {
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

    locations: apiResponseBody,
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

const processAPIError = (req, res, apiError, renderCallback) => {
  debug(
    `caught error from ${getAPIResponseId(apiError.response)}`,
    apiError.message
  );

  if (apiError.stack) {
    debug(apiError.stack);
  }

  renderCallback(req, res, null, `Internal server error ${apiError.message}`);
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
    .then((apiResponse) => {
      processAPIResponse(req, res, apiResponse, callback);
    })
    .catch((apiError) => {
      processAPIError(req, res, apiError, callback);
    });
};

const locationInfo = (req, res) => {
  const locationId = req.query.id;
  debug(`path=${req.path}; location id=${locationId}`);

  const url = `${runtime.options.serviceRootURL}/api/locations/${locationId}`;

  const callback = renderLocationDetail;
  axios
    .get(url, { validateStatus: null })
    .then((apiResponse) => {
      processAPIResponse(req, res, apiResponse, callback);
    })
    .catch((apiError) => {
      processAPIError(req, res, apiError, callback);
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
