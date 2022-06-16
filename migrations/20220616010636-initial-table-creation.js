'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('restaurants', {
      Id: { type: Sequelize.INTEGER, primaryKey: true },
      Name: { type: Sequelize.STRING },
      Address: { type: Sequelize.STRING },
      City: { type: Sequelize.STRING },
      State: { type: Sequelize.STRING },
      Zipcode: { type: Sequelize.STRING }
    })

    await queryInterface.createTable('metricDefinitions', {
      Id: { type: Sequelize.INTEGER, primaryKey: true },
      MetricCode: { type: Sequelize.STRING },
      Alias: { type: Sequelize.STRING },
      DataType: { type: Sequelize.STRING },
      DecimalPlaces: { type: Sequelize.INTEGER }
    })

    return queryInterface.createTable('transactions', {
      RestaurantId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: 'restaurants', key: 'Id' } },
      BusDt: { type: Sequelize.DATEONLY, primaryKey: true },
      OrderNumber: { type: Sequelize.INTEGER, primaryKey: true },
      OrderTime: { type: Sequelize.DATE },
      OrderTimeMinuteOfDay: { type: Sequelize.INTEGER },
      TotalAmount: { type: Sequelize.FLOAT },
      NetAmount: { type: Sequelize.FLOAT },
      ItemSoldQty: { type: Sequelize.INTEGER },
      BeverageQty: { type: Sequelize.INTEGER },
      DiscountAmount: { type: Sequelize.FLOAT },
      DiscountRatio: { type: Sequelize.FLOAT },
      ItemDeletedAmount: { type: Sequelize.FLOAT },
      RefundAmount: { type: Sequelize.FLOAT }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('transactions')
    await queryInterface.dropTable('metricDefinitions')

    return queryInterface.dropTable('restaurants')
  }
}
