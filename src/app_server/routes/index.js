'use strict';

const ctrlLocations = require('../controllers/location-controllers');
const ctrlOthers = require('../controllers/other-controllers');
const express = require('express');
const router = express.Router();

/* Locations pages */
router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);
router.post('/location/review/new', ctrlLocations.saveReview);

router.get('/about', ctrlOthers.about);
router.get('/test', ctrlOthers.test);

module.exports = router;
