const mongoose = require('mongoose')
// plugin to make sure same email can't be used twice
const uniqueValidator = require('mongoose-unique-validator')
// plugin to prevent external injections
const sanitizer = require('express-mongo-sanitize')

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)
userSchema.plugin(sanitizer)

module.exports = mongoose.model('User', userSchema)
