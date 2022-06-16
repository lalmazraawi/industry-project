'use strict'
const restaurantData = require('../data/RestaurantData.json')
const metricDefinition = require('../data/MetricDefinition.json')
const transactionData = require('../data/TransactionData.json')

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('restaurants', restaurantData)
    await queryInterface.bulkInsert('metricDefinitions', metricDefinition)

    return queryInterface.bulkInsert('transactions', transactionData)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('transactions')
    await queryInterface.bulkDelete('metricDefinitions')

    return queryInterface.bulkDelete('restaurants')
  }
}
