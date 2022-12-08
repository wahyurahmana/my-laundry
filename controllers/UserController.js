const { compare } = require('../helpers/bcryptjs.js')
const { token } = require('../helpers/jwt.js')
const {User} = require('../models/index.js')

module.exports = class UserController {
  static async login(req, res, next){
    try {
      const {username, password} = req.body
      
      const user = await User.findOne({
        where : {
          username
        }
      })
      if(username === null){
        throw {status : 401, message : "Email/Password Wrong"}
      }
      
      const checkPassword = compare(password, user.password)
      if(!checkPassword){
        throw {status : 401, message : "Email/Password Wrong"}
      }

      const acs_tkn = token({id : user.id, username : user.username})
      res.status(200).json({access_token : acs_tkn})
    } catch (error) {
      next(error)
    }
  }
}