const errorTypes = require('../constants/error-types')


const errorHandler = (error, ctx) => {
  let status, message
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = "用户名或者密码不能为空"
      break
    case errorTypes.NAME_IS_EXISTED:
      status = 400
      message = "用户名重复"
      break
    case errorTypes.NAME_DOSE_NOT_EXIST:
      status = 400
      message = "用户名不存在"
      break
    case errorTypes.PASSWORD_IS_WRONG:
      status = 400
      message = "密码错误"
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = "未授权 token无效"
      break
    case errorTypes.UNPERMISSION:
      status = 401
      message = "没有权限"
      break
    default:
      status = 404
      message = "NOT FOUND"
  }
 ctx.status = status
 ctx.body = message
}

module.exports = errorHandler