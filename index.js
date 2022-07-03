const express = require('express')
const bodyParser = require('body-parser')
const customSearchQuery = express()


customSearchQuery.use(express.static('client/build'))

const metricDefinitionRouter = require('./routes/metricDefinition')
const searchRouter = require('./routes/search')
const restaurantsRouter = require('./routes/restaurant')

// Set body-parser to be able to read body from POST requests

customSearchQuery.use(bodyParser.json())

customSearchQuery.use('/metricDefinition', metricDefinitionRouter)
customSearchQuery.use('/search', searchRouter)
customSearchQuery.use('/restaurants', restaurantsRouter)

customSearchQuery.all('*', (req, res) => res.sendFile(__dirname, 'client/build', 'index.html'))

customSearchQuery.listen(1337, () => {
  console.log('listening at http://localhost:1337...') // eslint-disable-line no-console
})
