const passwordSchema = require('../models/password');

//verification que le mot de passe saisie corresponde a la demande
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)){
    return res.status(400).json('Password strength is too weak !')
  }else {
    next()
  }
}