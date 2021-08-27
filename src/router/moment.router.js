const Router = require('koa-router')
const { create, detail, update, remove } = require('../controller/moment.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const { verifyPermission } = require('../middleware/auth.middleware')


const momentRouter = new Router({prefix: '/moment'})

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/:momentId', detail)
momentRouter.get('/', detail)
momentRouter.patch('/:momentId/:userId',verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId/:userId', verifyAuth, verifyPermission, remove)


module.exports = momentRouter