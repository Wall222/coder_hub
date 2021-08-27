const jwt = require('jsonwebtoken')

const errorTypes = require('../constants/error-types')
const service = require('../services/user.service')
const authService = require('../services/auth.service')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')


const verifyLogin = async (ctx, next) => {
  // try {
    const { name, password } = ctx.request.body
    if (!name || !password) {
      const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
       return  ctx.app.emit('error', error, ctx)
    }
    const user = await service.getUserByName(name)
    if(!user) {
      const error = new Error(errorTypes.NAME_DOSE_NOT_EXIST)
      return ctx.app.emit('error', error, ctx)
    }
    if(md5password(password) !== user.password) {
      const error = new Error(errorTypes.PASSWORD_IS_WRONG)
      return ctx.app.emit('error', error, ctx)
    }
    ctx.user = user
    await next()
  // } catch (error) {
  //   console.log(error);
  // }
} 

const verifyAuth = async (ctx, next) => {
  // 拿到token
  const authorization = ctx.headers.authorization
  const token = authorization.replace('Bearer', '')
  await next()
  // 验证token
  // try {
  //   // const res = jwt.verify(token, PUBLIC_KEY, {
  //   //   algorithms: ["RS256"]
  //   // })
  //   console.log(res);
  //   ctx.user = res
  //   await next()
  // } catch (err) {
  //   console.log(err);
  //   const error = new Error(errorTypes.UNAUTHORIZATION)
  //   ctx.app.emit('error', error, ctx)
  // }
}

const verifyPermission = async (ctx, next) => {
  const { userId } = ctx.params
  let [key] = Object.keys(ctx.params)
  const collection = key.replace('Id','')
  const resourceId = ctx.params[key]
  console.log(collection,resourceId, userId);
  const isPermission = await authService.checkAuth(collection, resourceId, userId)
  console.log(isPermission);
  if(!isPermission) {
    const error = new Error(errorTypes.UNPERMISSION)
    ctx.app.emit('error', error, ctx)
  } else {
    await next()
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}