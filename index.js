const express = require('express')
const bodyParser = require('body-parser')
const customSearchQuery = express()

const metricDefinitionRouter = require('./routes/metricDefinition')
const searchRouter = require('./routes/search')
const restaurantsRouter = require('./routes/restaurant')

// Set body-parser to be able to read body from POST requests

customSearchQuery.use(bodyParser.json())

customSearchQuery.use('/metricDefinition', metricDefinitionRouter)
customSearchQuery.use('/search', searchRouter)
customSearchQuery.use('/restaurants', restaurantsRouter)

customSearchQuery.listen(3000, () => {
  console.log('listening at http://localhost:3000...') // eslint-disable-line no-console
})
