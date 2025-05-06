// routes/dataRoutes.js
const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

router.post("/locations", dataController.getLocations);

module.exports = router;
