
const express = require('express')
const mongoose = require('mongoose') // Package to help to communicate with MongoDB
const path = require('path') // help to generate path for images
const app = express()
<<<<<<< HEAD
const helmet = require('helmet') // sets up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS)
=======

require('dotenv').config() // hide MongoDB userName & password
>>>>>>> b1c981858a6fba322b7e8065c0b073cd6d91d02d

const userRoutes = require('./routes/user')
const saucesRoutes = require('./routes/sauce')

<<<<<<< HEAD
=======
const rateLimit = require('express-rate-limit') // limit number of request in a certain time frame
>>>>>>> b1c981858a6fba322b7e8065c0b073cd6d91d02d

const rateLimit = require('express-rate-limit') // limit number of request in a certain time frame
const limiter = rateLimit({
<<<<<<< HEAD
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again after 30 minutes" // this message is shown to user when max requests is exceeded
})

// MongoDB *******************************************************
require('dotenv').config() // hide MongoDB userName & password
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bjiad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
=======
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 15 requests per windowMs
    message: "Too many requests, please try again after 15 minutes"
    // above message is shown to user when max requests is exceeded
})
app.use(limiter)

const saucesRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

// hide MongoDB userName & password (everywhere including GitHub)
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bjiad.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// connect to MongoDB
>>>>>>> b1c981858a6fba322b7e8065c0b073cd6d91d02d
mongoose.connect(connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Successfully connected to MongoDB !'))
    .catch(() => console.log('Failed to connect to MongoDB !'))

<<<<<<< HEAD
// Deal with CORS errors ****************************************
app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*') // allow access to all users
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization') // allow certain types of headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS') // allow certain types of methods
    next() // pass on to next middleware
=======
// Prevent Cors Errors
app.use((req, res, next) => {
    // allow access to all users
    res.setHeader('Access-Control-Allow-Origin', '*')
    // allow certain types of headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    // allow certain types of methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    // pass on to next middleware
    next()
>>>>>>> b1c981858a6fba322b7e8065c0b073cd6d91d02d
})

app.use(express.json()) // replaces body-parser, now included in express

app.use(helmet())
app.use(limiter) // rate limiting applies to all routes
app.use('/images', express.static(path.join(__dirname, 'images'))) // add image

<<<<<<< HEAD
=======
// Routes
app.use('/api/sauces', saucesRoutes)
>>>>>>> b1c981858a6fba322b7e8065c0b073cd6d91d02d
app.use('/api/auth', userRoutes)
app.use('/api/sauces', saucesRoutes)

<<<<<<< HEAD
module.exports = app // export to use elsewhere

=======
// export to use elsewhere
module.exports = app
>>>>>>> b1c981858a6fba322b7e8065c0b073cd6d91d02d
