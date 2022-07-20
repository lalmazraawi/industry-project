const express = require('express')
const filterData = require('../mappers/searchMapper')
const router = express.Router()

// Get MetricDefinitions 
router.post('/', express.json(), filterData)

module.exports = router
