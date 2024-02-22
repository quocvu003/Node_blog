const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars')
const morgan = require('morgan')
const app = express()
const port = 3000

const route = require('./routes')

// Static
app.use(express.static('./src/public/'))

// Midleware
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())

// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', './src/resources/views')

// Routes
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
