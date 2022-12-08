const jwt = require('jsonwebtoken');

module.exports = {
  token : (payload) => {
    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {expiresIn : '6h'});
    return token
  },
  decoded : (token) => {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    return decoded
  }
}