const getDb = require('../utils/database').getDb;
var ObjectId = require('mongodb').ObjectID;

class User {

  constructor(username,email,cart){
    this.username = username;
    this.email =email;
    this.cart = cart;
  }

  save(){
     const db = getDb();
     return db.collection('users').insertOne(this);
  }
  
  static checkExistingProduct(id){
     const db = getDb();
     return db.collection('users').find({_id: ObjectId(id)}).toArray()
  }
  
  static getCartProducts(productIds){
    const db = getDb();
    return db.collection('products').find({_id: { $in: productIds }}).toArray();
  }

  static updateCart(id,newValues){
    const db = getDb();
    return db.collection('users').updateOne({ _id: ObjectId(id)},newValues)
   }

  static findById(id){
    const db = getDb();
    return db.collection('users').find({ _id: ObjectId(id) }).toArray();
  }

}

module.exports = User;