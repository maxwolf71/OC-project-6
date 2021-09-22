const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') // plugin to make sure same email can't be used twice
const sanitizer = require('express-mongo-sanitize') // plugin to prevent external injections

const userSchema = mongoose.Schema({
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)
userSchema.plugin(sanitizer)

module.exports = mongoose.model('User', userSchema)
