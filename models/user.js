const getDb = require('../utils/database').getDb;
var ObjectId = require('mongodb').ObjectID;

class User {

  constructor(username,email){
    this.username = username;
    this.email =email
  }

  save(){
     const db = getDb();
     return db.collection('users').insertOne(this);
  }

  static findById(id){
    const db = getDb();
    return db.collection('users').find({ _id: ObjectId(id) }).toArray();
  }

}

module.exports = User;