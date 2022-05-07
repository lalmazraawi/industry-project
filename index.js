const express = require ("express")
const metric = require ("./dataFiles/MetricDefinition.json")
const restaurant = require ("./dataFiles/RestaurantData.json")
const transaction = require ("./dataFiles/TransactionDataNew.json")

const app = express()

app.get('/metric', (req, res) => {
    return res.send(metric[0])

  })

app.get('/restaurant', (req, res) => {
    return res.send(restaurant[0])

  })

app.get('/transaction', (req, res) => {
    return res.send(transaction[0])

  })

  app.get('/datafiles', (req, res) => {
    return res.send([metric[0],restaurant[0],transaction[0]])

  })


app.listen (1339, () => {
    console.log('Listening on 1339')
})


