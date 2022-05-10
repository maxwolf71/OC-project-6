const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1] // retrieve token in headers of the request
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET') // decode token
    const userId = decodedToken.userId // retrieve user id

    if (req.body.userId && req.body.userId !== userId) { // check : user id present in request + compare to id in token
      throw 'Invalid user ID !'
    } else {
      next()
    }
  } catch {
    res.status(401).json({ error: new Error('Invalid request!') })
  }
}
  