const errorTypes = require('../constants/error-types')
const service = require('../services/user.service')
const md5password = require('../utils/password-handle')


const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
     return  ctx.app.emit('error', error, ctx)
  }
  const result = await service.getUserByName(name)
  if(result) {
    const error = new Error(errorTypes.NAME_IS_EXISTED)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
} 

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password =md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}