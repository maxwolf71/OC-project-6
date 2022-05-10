const User = require('../models/user')

const bcrypt = require('bcrypt') // hash password
const jwt = require('jsonwebtoken') // for creating and verifying token

// SIGNUP **********************************
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // hash password
        .then(hash => {
            const user = new User({
                email: req.body.email, // email in body of request
                password: hash // hashed password  
            })
            user.save() // save user in DB
                .then(() => res.status(201).json({ message: 'User created !' }))
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

// LOGIN **********************************
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // check if entered email is in the DB
        .then(user => {
            if (!user) { // if user not found
                return res.status(404).json({ error: 'User not found !' })
            }
            bcrypt.compare(req.body.password, user.password) // if user found then compare password in request to password in DB
                .then(valid => {
                    if (!valid) {  // if password doesn't match
                        return res.status(401).json({ error: 'Password not valid !' })
                    }
                    res.status(200).json({ // if password matches  
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },  // use current user's id
                            'RANDOM_TOKEN_SECRET', // temporary string
                            { expiresIn: '24h' } // connect duration
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status({ error }))
}

