const { MongoClient, url } = require('../db/index')
const ObjectId = require('mongodb').ObjectId

class CommentService {
  async create(comment) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      const res = await dbo.collection("comment").insertOne(comment)
      const result = await dbo.collection("moment").aggregate([
        {
          $lookup:{
            from: 'comment',
            localField: 'momentId',
            foreignField:'id',
            as: 'comments'
          }
        }
      ]).toArray()
      return res
    } catch (error) {
      console.log(error);
      throw error
    }   
  }
  async reply(reply) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      console.log(reply);
      const res = await dbo.collection("comment").insertOne(reply)
      const result = await dbo.collection("comment").aggregate([
        {
          $lookup:{
            from: 'comment',
            localField: 'commentId',
            foreignField:'_id',
            as: 'reply'
          }
        }
      ]).toArray()
      console.log(result);
      return res
    } catch (error) {
      console.log(error);
      throw error
    } 
  }
  async update(commentId,content) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      console.log(ObjectId(commentId));
      const res = await dbo.collection("comment").updateOne({"_id":ObjectId(commentId)},{$set:{"content": content}})
      return res
    } catch (error) {
      console.log(error);
      throw error
    }
  }
  async remove(commentId) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub")
      const res = await dbo.collection("comment").deleteOne({"_id":ObjectId(commentId)})
    } catch (error) {
      
    }
  }
}

module.exports = new CommentService()