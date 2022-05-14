const express = require("express");
const transactionDataRepository = require("../repository/transactionRepository");
const router = express.Router();

//Get MetricDefinitions 
router.post("/", (req, res) => {
res.send(req.body)

});

module.exports = router