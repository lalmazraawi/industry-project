const express = require('express')
const models = require('../repository')
const router = express.Router()

// Get metricDefinitions
router.get('/', async (req, res) => {
  try {
    const restaurants = await models.Restaurants.findAll()

    return res.send(restaurants)
  }
  catch (error) {
    return res.sendStatus(500)
  }
})

module.exports = router
