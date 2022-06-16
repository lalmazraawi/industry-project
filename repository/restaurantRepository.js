const restaurants = (connection, Sequelize) => {
  return connection.define('restaurants', {
    Id: { type: Sequelize.INTEGER, primaryKey: true },
    Name: { type: Sequelize.STRING },
    Address: { type: Sequelize.STRING },
    City: { type: Sequelize.STRING },
    State: { type: Sequelize.STRING },
    Zipcode: { type: Sequelize.STRING }
  })
}

module.exports = restaurants
