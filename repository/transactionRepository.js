const transactions = (connection, Sequelize, Restaurants) => {
  return connection.define('transactions', {
    RestaurantId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: Restaurants, key: 'Id' } },
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
  }, {
    paranoid: true,
    defaultScope: { attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }
  })
}

module.exports = transactions
