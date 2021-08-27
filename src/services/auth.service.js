const { MongoClient, url } = require('../db/index')
const ObjectId = require('mongodb').ObjectId


class AuthService {
  async checkAuth(collection,id, userId) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      const res = await dbo.collection(`${collection}`).findOne({"_id":ObjectId(id)})
      if(res.userId === userId) {
        return true
      } else return false
    } catch (error) {
      throw error
    }   
  }
}

module.exports = new AuthService()