const e = require('express');
const Product  = require('../models/products.js');
const User = require('../models/user');
var ObjectId = require('mongodb').ObjectID;

exports.getAllProducts = (req,res,next) => {
  Product.findAll().then(resp=>{
      res.status(200).send(resp);
  }).catch(err=>{
      res.status(400).send(err);
  })
}

exports.getAllProductsById = (req,res,next) => {
  const id = req.query.id;
  Product.findByPk(id).then(resp=>{
      res.status(200).send(resp);
  }).catch(err=>{
      res.status(400).send(err);
  })
}

exports.getCart= (req,res,next) =>{
     
    const userId = req.body.user[0]._id;

    if(!req.body.user[0]._id){
      return res.status(400).send('User Id is required');
    }

    User.checkExistingProduct(userId).then(response =>{

      if(!response[0].cart.items){
        return res.status(200).send('Cart is Empty')
      }

      let productIds = [];
      var items = response[0].cart.items;
      for(let product of response[0].cart.items){
        productIds.push(ObjectId(product.productId))
      }

      User.getCartProducts(productIds).then(products =>{
        products.forEach(product => {
          items.forEach(prod =>{
             if(prod.productId == product._id){
               product.quantity = prod.quantity
             }
          });
        });
       return res.status(200).send(products);
      })
      
    }).catch(err =>{
        res.status(200).send(err)
    })

}

exports.addItem = (req,res,next) => {
    const product = req.body
    const userId = req.body.user[0]._id;

    if(!req.body.user[0]._id){
      return res.status(400).send('User Id is required');
    }
    // console.log(product)
    User.checkExistingProduct(userId).then(response =>{

       var body  = req.body;
       delete body.user;
       var cartItems
       var updatedCart = {};
       if(response[0]['cart'].items){
        cartItems = response[0].cart.items
        const index  = cartItems.findIndex(item =>{
            return item.productId == product._id
        })
        updatedCart = response[0]['cart']
        if(index >= 0){
            updatedCart['items'][index].quantity = response[0].cart['items'][index].quantity + 1;
          } else{
             updatedCart['items'].push({productId:product._id,quantity:1})
         }
       }
       else{
          updatedCart['items'] = [];
          updatedCart['items'].push({productId:product._id,quantity:1});
       }

       var newvalues = {
            $set: {
                username : response[0].name,
                email : response[0].email,
                cart: updatedCart
            } 
        }

        User.updateCart(userId,newvalues).then(cart =>{
          res.status(200).send(cart)
        }).catch(err =>{
          res.status(200).send(err)
        })
      
    });
  
    
}


exports.deleteProductFromCart = (req,res,next) =>{

  const userId = req.body.user[0]._id;
  const productRemoveId = req.body.productId;

  if(!req.body.user[0]._id){
    return res.status(400).send('User Id is required');
  }

  User.checkExistingProduct(userId).then(response =>{
    var cartItems ;
    cartItems = response[0].cart.items
    var updatedCart = {};

    const index  = cartItems.findIndex(item =>{
        return item.productId == productRemoveId
    });

    updatedCart = response[0]['cart']
    
    if(index >= 0){
      updatedCart['items'].splice(index,1);
     } else{
       return res.status(200).send('Product Dont Found')
    }

    var newvalues = {
      $set: {
          cart: updatedCart
      } 
    }

    User.updateCart(userId,newvalues).then(cart =>{
      res.status(200).send(cart)
    }).catch(err =>{
      res.status(200).send(err)
    })

  }).catch(err=>{
    console.log(err);
  })
 }


exports.postOrder  = (req,res,next) =>{
  req.user.getCart()
  .then(cart =>{
    return cart.getProducts();
  })
  .then(products =>{
   console.log(products)
  })
  .catch();
}