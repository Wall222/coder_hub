const service = require('../services/file.service')


class FileController {
  async saveAvatarInfo(ctx, next) {
    console.log(ctx.req.file);
    const {filename, mimetype, size} = ctx.req.file
    const {userId} = ctx.params
    const result = await service.createAvatar(filename, mimetype, size, userId)
    ctx.body = result
  }
}

module.exports = new FileController()