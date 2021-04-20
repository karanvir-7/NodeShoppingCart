const getDb = require('../utils/database').getDb;
var ObjectId = require('mongodb').ObjectID;

class Product  {

   constructor(title, price, description, imageUrl){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl
   }

   save(){
     const db = getDb();
     return db.collection('products').insertOne(this)
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