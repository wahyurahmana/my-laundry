const { decoded } = require("../helpers/jwt")

module.exports = (req, res, next) => {
  try {
    if(!req.headers.access_token){
      throw{status : 401, message : 'Please Login'}
    }
    const user = decoded(req.headers.access_token)
    req.user = user
    next()
  } catch (error) {
    next({status : 401, message : 'Please Login'})
  }

}