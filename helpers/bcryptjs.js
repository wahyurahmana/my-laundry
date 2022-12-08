const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

module.exports = {
  hash : (input) => {
    const hash = bcrypt.hashSync(input, salt);
    return hash
  },
  compare : (input, hash) => {
    const compare = bcrypt.compareSync(input, hash);
    return compare
  }
}