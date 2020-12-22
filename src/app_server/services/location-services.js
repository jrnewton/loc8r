'use strict';

const debug = require('debug')('loc8r:app_services');
const runtime = require('../../runtime');
/* use '.default' otherwise you'll get a tslint warning
   see https://github.com/axios/axios/issues/1975 */
const axios = require('axios').default;

const debugId = (response) => {
  return `${response.request.method} ${response.request.path}`;
};

const processResponse = (apiResponse) => {
  debug(`got ${apiResponse.status} from ${debugId(apiResponse)}`);

  if (apiResponse.status === 200) {
    //when status is 200 response.data will always be a non-empty array
    return apiResponse.data;
  } else {
    let message = '';

    if (apiResponse.status === 404) {
      return null;
    } else {
      message = '' + apiResponse.status;
      if (apiResponse.data.message) {
        message = message + ': ' + apiResponse.data.message;
      }
      throw new Error(message);
    }
  }
};

const processError = (apiError) => {
  debug(`caught error from ${debugId(apiError.response)}`, apiError.message);

  if (apiError.stack) {
    debug(apiError.stack);
  }

  throw new Error(`Internal server error ${apiError.message}`);
};

const getLocationList = async (geoParams, test) => {
  const url = `${runtime.options.serviceRootURL}/api/locationsbygeo`;

  const options = {
    validateStatus: null,
    params: geoParams
  };

  if (test === 'true') {
    options.params.lng = 0;
    options.params.lat = 0;
  }

  debug('url', url);
  debug('options', options);

  try {
    const apiResponse = await axios.get(url, options);
    return processResponse(apiResponse);
  } catch (error) {
    processError(error);
  }
};

const getSingleLocation = async (locationId) => {
  debug(`location id=${locationId}`);

  const url = `${runtime.options.serviceRootURL}/api/locations/${locationId}`;

  try {
    const apiResponse = await axios.get(url, { validateStatus: null });
    return processResponse(apiResponse);
  } catch (error) {
    processError(error);
  }
};

const addReview = async (locationId, review) => {
  debug(`location id=${locationId}`);

  const url = `${runtime.options.serviceRootURL}/api/locations/${locationId}/reviews`;

  try {
    const apiResponse = await axios.post(url, review, { validateStatus: null });
    return processResponse(apiResponse);
  } catch (error) {
    processError(error);
  }
};

module.exports = {
  getLocationList,
  getSingleLocation,
  addReview
};
