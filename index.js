// const express = require ("express")
// const metric = require ("./dataFiles/MetricDefinition.json")
// const restaurant = require ("./dataFiles/RestaurantData.json")
// const transaction = require ("./dataFiles/TransactionDataNew.json")

// const app = express()

// app.get('/metric', (req, res) => {
//     return res.send(metric[0])

//   })

// app.get('/restaurant', (req, res) => {
//     return res.send(restaurant[0])

//   })

// app.get('/transaction', (req, res) => {
//     return res.send(transaction[0])

//   })

//   app.get('/datafiles', (req, res) => {
//     return res.send([metric[0],restaurant[0],transaction[0]])

//   })


// app.listen (1339, () => {
//     console.log('Listening on 1339')
// })

// Set body-parser to be able to read body from POST requests
const express = require('express')
const bodyParser = require('body-parser')
const customSearchQuery = express()

const metricDefinitionRouter = require('./routes/metricDefinition')
const searchRouter = require('./routes/search')

// Set body-parser to be able to read body from POST requests

customSearchQuery.use(bodyParser.json())

customSearchQuery.use('/metricDefinition', metricDefinitionRouter)
customSearchQuery.use('/search', searchRouter)

console.log('This works') // eslint-disable-line no-console

customSearchQuery.listen(3000)
