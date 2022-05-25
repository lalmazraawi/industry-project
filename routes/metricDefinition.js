const express = require('express')
const metricDefinitionRepository = require('../repository/metricDefinitionRepository')
const router = express.Router()

// Get metricDefinitions
router.get('/', (req, res) => {
  const metricDefinition = metricDefinitionRepository.getMetricDefinition()

  res.send(metricDefinition)
})

module.exports = router
