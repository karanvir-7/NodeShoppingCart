const mongoose  = require('mongoose');

const Schema  = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  cart:{
    items:[{productId:{},quantity:{}}]
  }
})

userSchema.methods.addToCart = function(product){
    const index = this.cart.items.findIndex(item =>{
      return item.productId.toString() == product._id.toString();
    });

    let updatedCart = this.cart.items
    
    if(index >= 0){
      updatedCart[index].quantity = this.cart['items'][index].quantity + 1;
    }else{
      updatedCart.push({productId : product._id,quantity : 1})
    }

    const updatedCartNew = {
       items : updatedCart
    }
     
    this.cart = updatedCartNew;
    return this.save();

}


userSchema.methods.getCartItem = function(){

    if(this.cart.items.length == 0){
      return 'cart is empty';
    }

    return this.cart['items'];
}

module.exports = mongoose.model('user',userSchema);



// const getDb = require('../utils/database').getDb;
// var ObjectId = require('mongodb').ObjectID;

// class User {

//   constructor(username,email,cart){
//     this.username = username;
//     this.email =email;
//     this.cart = cart;
//   }

//   save(){
//      const db = getDb();
//      return db.collection('users').insertOne(this);
//   }

//   static orderItem(order){
//     const db = getDb();
//     return  db.collection('orders').insertOne(order)
//   }

//   static checkExistingProduct(id){
//      const db = getDb();
//      return db.collection('users').find({_id: ObjectId(id)}).toArray()
//   }
  
//   static getCartProducts(productIds){
//     const db = getDb();
//     return db.collection('products').find({_id: { $in: productIds }}).toArray();
//   }

//   static updateCart(id,newValues){
//     const db = getDb();
//     return db.collection('users').updateOne({ _id: ObjectId(id)},newValues)
//    }

//   static findById(id){
//     const db = getDb();
//     return db.collection('users').find({ _id: ObjectId(id) }).toArray();
//   }

// }

// module.exports = User;