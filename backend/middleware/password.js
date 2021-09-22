const passwordSchema = require('../models/password')

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)){
    return res.status(400).json('Password strength is too weak !')
  }else {
    next()
  }
}