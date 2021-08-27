const userService = require('../services/user.service')
const fileService = require('../services/file.service')
const fs = require('fs')
const {AVATAR_PATH} = require('../constants/file-path')


class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.create(user)
    ctx.body = result
    next()
  }
  async avatarInfo(ctx, next) {
    const {userId} = ctx.params
    const result = await fileService.getAvatarInfo(userId)
    console.log(result);
    ctx.response.set('content-type', result.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
  }
}

module.exports = new UserController()