const express = require('express')
const models = require('../repository')
const router = express.Router()

// Get metricDefinitions
router.get('/', async (req, res) => {
  try {
    const metricDefinition = await models.MetricDefinitions.findAll()

    return res.send(metricDefinition)
  }
  catch (error) {
    return res.sendStatus(500)
  }
})

module.exports = router
