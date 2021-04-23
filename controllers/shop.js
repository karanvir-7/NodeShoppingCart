const e = require('express');
const Product  = require('../models/products.js');
const User = require('../models/user');

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
    req.user.getCart().then(cart => {
       return cart.getProducts();
    }).then(products =>{
        res.status(200).send(products)
    }).catch(err =>{
        console.log(err);
    })
}

exports.addItem = (req,res,next) => {
    const product = req.body
    const userId = req.body.user[0]._id
    if(!req.body.user[0]._id){
      return res.status(400).send('Product Id is required');
    }
    // console.log(product)
    User.checkExistingProduct(userId).then(response =>{

       var body  = req.body;
       delete body.user;
       var cartItems = response[0].cart.items
       const index  = cartItems.findIndex(item =>{
           return item.productId == product._id
       })
       var updatedCart;
       updatedCart = response[0]['cart']
       if(index >= 0){
           console.log(updatedCart,index)
           updatedCart['items'][index].quantity = response[0].cart['items'][index].quantity + 1;
        } else{
            updatedCart['items'].push({productId:product._id,quantity:1})
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
  const prodId = req.body.productId;

  req.user.getCart()
  .then(cart => {
    return cart.getProducts({ where: { id: prodId } })
  })
  .then(products =>{
    let product;
    if(products.length > 0){
       product = products[0]
       return product.cartItem.destroy();
    }else{
      res.status(400).send('No Product Found')
    }
  })
  .then(product =>{
    res.status(200).send('Product Removed From Cart')
  })
  .catch(err =>{
    res.status(400).send(err);
  });
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