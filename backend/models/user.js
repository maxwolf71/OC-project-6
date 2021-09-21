<<<<<<< HEAD
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') // plugin to make sure same email can't be used twice
const sanitizer = require('express-mongo-sanitize') // plugin to prevent external injections
=======
const mongoose = require('mongoose') // plugin to make sure same email can't be used twice
const uniqueValidator = require('mongoose-unique-validator') // plugin to prevent external injections
const sanitizer = require('express-mongo-sanitize')
>>>>>>> b1c981858a6fba322b7e8065c0b073cd6d91d02d

const userSchema = mongoose.Schema({
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)
userSchema.plugin(sanitizer)

module.exports = mongoose.model('User', userSchema)
