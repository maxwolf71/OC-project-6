const jwt = require('jsonwebtoken')

// check token : is valid + userid in request is the same as in the token
module.exports = (req, res, next) => {
  try {
    // retrieve token in headers of the request
    const token = req.headers.authorization.split(' ')[1]
    // decode token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    // retrieve user id
    const userId = decodedToken.userId
    // check : user id present in request + compare to id in token
    if (req.body.userId && req.body.userId !== userId) {
      // send to error below
      throw 'Invalid user ID !'
    } else {
      next()
    }
  } catch {
    res.status(401).json({ error: new Error('Invalid request!') })
  }
}
