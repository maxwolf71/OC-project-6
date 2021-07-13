// hash password
const bcrypt = require('bcrypt')
// for creating and verifying token
const jwt = require('jsonwebtoken')

const User = require('../models/user')

// signup for new user
exports.signup = (req, res, next) => {
    // hash password
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                // email in body of request
                email: req.body.email,
                // hashed password 
                password: hash
            })
            // save user in DB
            user.save()
                .then(() => res.status(201).json({ message: 'User created !' }))
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

// login for currrent users
exports.login = (req, res, next) => {
    // check if entered email is in the DB
    User.findOne({ email: req.body.email })
        .then(user => {
            // if user not found
            if (!user) {
                return res.status(404).json({ error: 'User not found !' })
            }
            // if user found then compare password in request to password in DB
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // if password doesn't match
                    if (!valid) {
                        return res.status(401).json({ error: 'Password not valid !' })
                    }
                    // if password matches   
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            // use current user's id
                            { userId: user._id },
                            // temporary string
                            'RANDOM_TOKEN_SECRET',
                            // connect duration
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status({ error }))
}

