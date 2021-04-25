const getDb = require('../utils/database').getDb;
var ObjectId = require('mongodb').ObjectID;

class Product  {

   constructor(title, price, description, imageUrl,userId){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userId = userId
      }

   save(){
     const db = getDb();
     return db.collection('products').insertOne(this)
   }

   static deleteById(id){
    const db = getDb();
    return db.collection('products').deleteOne({ _id: ObjectId(id)})
   }




   static updateProductDetails(id,newValues){
    const db = getDb();
    return db.collection('products').updateOne({ _id: ObjectId(id)},newValues)
   }

   static getAllProducts(){
     const db = getDb();
     return db.collection('products').find().toArray()
   }

   static getProductById(id){
     const db = getDb();
     return  db.collection('products').find({ _id: ObjectId(id) }).toArray();
   }

}

module.exports = Product;