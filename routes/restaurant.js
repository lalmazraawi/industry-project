const express = require('express')
const restaurantRepository = require('../repository/restaurantRepository')
const router = express.Router()

// Get metricDefinitions
router.get('/', (req, res) => {
  const restaurant = restaurantRepository.getRestaurantData()

  res.send(restaurant)
})

module.exports = router
