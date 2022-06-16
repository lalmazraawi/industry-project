const Sequelize = require('sequelize')
const restaurants = require('./restaurantRepository')
const transactions = require('./transactionRepository')
const metricDefinitions = require('./metricDefinitionRepository')

const environment = process.env.NODE_ENV || 'development'
const { username, password, database, host, dialect } = config[environment] //eslint-disable-line

const connection = new Sequelize(database, username, password, {
  host: host, dialect: dialect
})

const Restaurants = restaurants(connection, Sequelize)
const Transactions = transactions(connection, Sequelize, Restaurants)
const MetricDefinitions = metricDefinitions(connection, Sequelize)

Restaurants.hasMany(Transactions)
Transactions.belongsTo(Restaurants)


module.exports = { Restaurants, Transactions, MetricDefinitions, Op: Sequelize.Op }
