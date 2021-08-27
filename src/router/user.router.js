const Router = require('koa-router')
const {verifyUser, handlePassword } = require('../middleware/user.middleware')
const userRouter = new Router({prefix:'/users'})

const {
  create,
  avatarInfo
} = require('../controller/user.controller')


userRouter.post('/', verifyUser, handlePassword, create)
userRouter.get('/:userId', avatarInfo)


// userRouter.post('/', (ctx, next) => {
//   console.log(ctx);
//   ctx.body = "创建用户成功~"
// })

module.exports = userRouter