const { MongoClient, url } = require('../db/index')
const ObjectId = require('mongodb').ObjectId

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      const res = await dbo.collection("avatar").insertOne({filename, mimetype, size, userId})
      return res
    } catch (error) {
      throw error
    }
  }
  async getAvatarInfo(userId) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      const res = await dbo.collection("avatar").findOne({"userId":userId})
      return res
    } catch (error) {
      throw error
    }
  }
}

module.exports = new FileService()