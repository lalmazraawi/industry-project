const metricDefinitions = (connection, Sequelize) => {
  return connection.define('metricDefinitions', {
    Id: { type: Sequelize.INTEGER, primaryKey: true },
    MetricCode: { type: Sequelize.STRING },
    Alias: { type: Sequelize.STRING },
    DataType: { type: Sequelize.STRING },
    DecimalPlaces: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

module.exports = metricDefinitions
