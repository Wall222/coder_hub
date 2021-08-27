const Router = require('koa-router')
const {verifyLogin, verifyAuth} = require('../middleware/auth.middleware')
const authRouter = new Router({prefix:'/login'})

const {
  login,
  success
} = require('../controller/auth.controller')


authRouter.post('/',verifyLogin, login)
authRouter.get('/test', verifyAuth, success)


module.exports = authRouter