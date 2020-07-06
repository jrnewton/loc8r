const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');
const express = require('express');
const router = express.Router();

/* Locations pages */
router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

router.get('/about', ctrlOthers.about);

module.exports = router;
