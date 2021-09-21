const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const helmet = require('helmet') // sets up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS)

const userRoutes = require('./routes/user')
const saucesRoutes = require('./routes/sauce')


const rateLimit = require('express-rate-limit') // limit number of request in a certain time frame
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again after 30 minutes" // this message is shown to user when max requests is exceeded
})

// MongoDB *******************************************************
require('dotenv').config() // hide MongoDB userName & password
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bjiad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successfully connected to MongoDB !'))
    .catch(() => console.log('Failed to connect to MongoDB !'))

// Deal with CORS errors ****************************************
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*') // allow access to all users
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization') // allow certain types of headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS') // allow certain types of methods
    next() // pass on to next middleware
})

app.use(express.json()) // replaces body-parser, now included in express

app.use(helmet())
app.use(limiter) // rate limiting applies to all routes
app.use('/images', express.static(path.join(__dirname, 'images'))) // add image

app.use('/api/auth', userRoutes)
app.use('/api/sauces', saucesRoutes)

module.exports = app // export to use elsewhere

