// make function for restaurant id; 
// .filter reastaurant id through an object using id # 1-10 

// loop that will filter through array, jump over index, etc 

// if restaurant id == 
// else ( not selected) move on 
// return 

// make function 2 

const transactions = require('../repository/transactionRepository')
const restaurants = require('../repository/restaurantRepository')

const filterData = async (req, res) => {
  const { restaurantIds, fromDate, toDate, fromHour, toHour, metricCriteria } = req.body

  const foundRestaurants = await restaurants.findAll({
    // where { Id : restaurantIds }
  })

  const foundTransactions = await transactions.findAll({
    // where restaurantIds include RestaurantId
    // where fromDate - toDate equals BusDt
    // where fromHour - toHour equals OrderTime
    // pass metricCriteria to a filterMetrics function
  })

  return res.status(200).send( { foundRestaurants, foundTransactions })
}

const filterMetrics = () => {

}

module.exports = filterData
