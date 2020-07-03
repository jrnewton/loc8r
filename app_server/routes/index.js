const controllers = require('../controllers/main');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', controllers.index);

module.exports = router;
