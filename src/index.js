const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars')
const morgan = require('morgan')
const methodOverride = require('method-override')
const app = express()
const port = 3000

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes')
const db = require('./config/db/index')

// Connect db
db.connect()

app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware)

// Static
app.use(express.static('./src/public/'))

// Midleware
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: require('./helpers/handlebars'),
    })
)
app.set('view engine', 'hbs')
app.set('views', './src/resources/views')

// Routes
route(app)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
