const express = require('express');
const router = express.Router();
const { TrackingController } = require('../controllers');

router.get('/tracking', TrackingController.trackingWaybill);

module.exports = router;
