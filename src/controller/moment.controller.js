const service = require('../services/moment.service')


class MomentController {
  async create(ctx, next) {
    const moment = ctx.request.body
    console.log(moment);
    const res = await service.createMoment(moment)
    ctx.body = res
  }
  async detail(ctx, next) {
    const momentId = ctx.params.momentId
    console.log(ctx);
    if(momentId) {
      const result =await service.getMomentById(momentId)
      ctx.body = result
    } else {
      const result = await service.getMomentList()
      ctx.body = result
    }
  }
  async update(ctx, next) {
    const momentId = ctx.params.momentId
    const content = ctx.request.body.content
    const result = await service.updateMoment(momentId,content)
    ctx.body = result
  }
  async remove(ctx, next) {
    const {momentId} = ctx.params
    console.log(momentId);
    const result = await service.removeMoment(momentId)
    ctx.body = result
  }
}

module.exports = new MomentController()