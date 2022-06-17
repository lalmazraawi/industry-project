const models = require('../repository')
const { Op } = require('sequelize')

const filterData = async (req, res) => {
  const {
    restaurantIds, fromDate, toDate, fromHour, toHour, metricCriteria
  } = req.body

  const compareTypeDictionary = {
    LessThan: Op.lt,
    LessThanOrEqual: Op.lte,
    Equal: Op.eq,
    GreaterThan: Op.gt,
    GreaterThanOrEqual: Op.gte
  }

  const searchQuery = {
    RestaurantId: restaurantIds,
    BusDt: { [Op.between]: [fromDate, toDate] },
    OrderTimeMinuteOfDay: { [Op.between]: [(fromHour * 60), (toHour * 60)] }
  }

  for (let i = 0; i < metricCriteria.length; i++) {
    const { metricCode, compareType, value } = metricCriteria[i]
    const seqCompareType = compareTypeDictionary[compareType]

    searchQuery[metricCode] = { [seqCompareType]: value }
  }

  const foundTransactions = await models.Transactions.findAll({
    where: searchQuery
  })

  const foundRestaurants = await models.Restaurants.findAll({
    where: { Id: restaurantIds }
  })

  return res.status(200).send({ foundRestaurants, foundTransactions })
}

module.exports = filterData
