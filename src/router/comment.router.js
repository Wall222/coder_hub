const Router = require('koa-router')
const { create, reply, update, remove } = require('../controller/comment.controller')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')

const commentRouter = new Router({prefix:'/comment'})
 
commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
commentRouter.patch('/:commentId/:userId', verifyAuth, verifyPermission, update)
commentRouter.delete('/:commentId/:userId', verifyAuth, verifyPermission, remove)


module.exports = commentRouter 