const crypto = require('crypto')

const md5password =  (password) => {
  try {
    const md5 = crypto.createHash('md5')
    password.toString()
    const result = md5.update(password.toString()).digest('hex')
    return result
  } catch (error) {
    console.log(error);
  }

}

module.exports = md5password