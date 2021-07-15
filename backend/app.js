const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
// hide MongoDB userName & password
require('dotenv').config()

// sets up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS)
const helmet = require('helmet')
app.use(helmet())

// limit number of request in a certain time frame
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: "Too many requests, please try again after 15 minutes"

    // this above message is shown to user when max requests is exceeded
})

app.use(limiter); // rate limiting applies to all routes

const saucesRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

// hide MongoDB userName & password
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bjiad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successfully connected to MongoDB !'))
    .catch(() => console.log('Failed to connect to MongoDB !'))

app.use((req, res, next) => {
    // allow access to all users
    res.setHeader('Access-Control-Allow-Origin', '*')
    // allow certain types of headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    // allow certain types of methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    // pass on to next middleware
    next()
})
// replaces body-parser, now included in express
app.use(express.json())

// add image
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', userRoutes)

// export to use elsewhere
module.exports = app

