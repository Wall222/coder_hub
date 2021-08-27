const { MongoClient, url } = require('../db/index')

class UserService {
  async create(user) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      const res = await dbo.collection("user").insertOne(user)
      return res
    } catch (error) {
      throw error
    }
  }
  async getUserByName(name) {
    try {
      const db =await MongoClient.connect(url)
      const dbo =await db.db("coderhub");
      const res = await dbo.collection("user").findOne({"name": name})
      return res
    } catch (error) {
      throw error
    }
  }
} 

module.exports = new UserService()

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("coderhub");
//   // console.log(dbo)
//   dbo.collection("user").insertOne(user, function(err, res) {
//       if (err) throw err;
//       console.log(res)
//       return res
//   });
// });