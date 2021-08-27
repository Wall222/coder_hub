const { MongoClient, url } = require('../db/index')

class MomentService {
  async createMoment(moment) {
    try {
      moment.id =Math.floor(Math.random()*10000000) 
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      const res = await dbo.collection("moment").insertOne(moment)
      return res
    } catch (error) {
      throw error
    }
  }
  async getMomentById(id) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      const res = await dbo.collection("moment").findOne({"id":Number(id)})
      return res
    } catch (error) {
      throw error
    }   
  }
  async getMomentList() {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      const res = await dbo.collection("moment").find({}).toArray()
      return res
    } catch (error) {
      throw error
    }    
  }
  async updateMoment(id,content) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      console.log(id, content);
      const res = await dbo.collection("moment").updateOne({"id":Number(id)},{$set:{"content": content}})
      console.log(res);
      return res
    } catch (error) {
      console.log(error);
      throw error
    }    
  }
  async removeMoment(id) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      console.log(id);
      const res = await dbo.collection("moment").deleteOne({"id":Number(id)})
      return res
    } catch (error) {
      throw error
    }  
  }
}

module.exports = new MomentService()