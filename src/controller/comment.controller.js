const service = require('../services/comment.service')
const ObjectId = require('mongodb').ObjectId


class CommentController {
  async create(ctx, next) {
    const comment = ctx.request.body
    const result = await service.create(comment)
    ctx.body = result
  }
  async reply(ctx, next) {
    const {momentId, content, userId} = ctx.request.body
    let {commentId} = ctx.params
    commentId = ObjectId(commentId)
    console.log(commentId);
    const result = await service.reply({momentId, content, userId, commentId})
    ctx.body = result
  } 
  async update(ctx, next) {
    const {commentId} = ctx.params
    const {content} = ctx.request.body
    const result = await service.update(commentId, content)
    ctx.body = result
  }
  async remove(ctx, next) {
    const {commentId} = ctx.params
    const result = await service.remove(commentId)
    ctx.body = result
  }
}

module.exports = new CommentController