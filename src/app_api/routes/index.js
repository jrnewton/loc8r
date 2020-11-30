'use strict';

const express = require('express');
const router = express.Router();

const runtime = require('../../runtime');
const ctrlLocations = require('../controllers/location-controllers');
const ctrlReviews = require('../controllers/review-controllers');

const locListGeoRoute = router.route('/locationsbygeo');
locListGeoRoute.get(ctrlLocations.locationsListByDistance);

const locListRoute = router.route('/locations');
locListRoute.get(ctrlLocations.locationsList);

const locRoute = router.route('/locations/:locationid');
locRoute.get(ctrlLocations.locationsReadOne);

const reviewRoute = router.route('/locations/:locationid/reviews/:reviewid');
reviewRoute.get(ctrlReviews.reviewsReadOne);

if (!runtime.options.readOnly) {
  locListRoute.post(ctrlLocations.locationsCreate);

  router
    .route('/locations/:locationid/reviews')
    .post(ctrlReviews.reviewsCreate);

  locRoute
    .put(ctrlLocations.locationsUpdateOne)
    .delete(ctrlLocations.locationsDeleteOne);

  reviewRoute
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);
}

module.exports = router;
