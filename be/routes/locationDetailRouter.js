// routes/dataRoutes.js
const express = require("express");
const router = express.Router();
const {
    getLocationsAlls,
    getNerbyLocations,
} = require("../models/LocationDetail");

router.post("/locations", getLocationsAlls);
router.post("/locations/nearby", getNerbyLocations);
module.exports = router;
