
const Product  = require('../models/products.js');
const User = require('../models/user');
const Order = require('../models/order');

var ObjectId = require('mongodb').ObjectID;

exports.getAllProducts = (req,res,next) => {
  Product.find().then(resp=>{
      res.status(200).send(resp);
  }).catch(err=>{
      res.status(400).send(err);
  })
}

exports.getAllProductsById = (req,res,next) => {
  const id = req.query.id;
  Product.findById(id).then(resp=>{
      res.status(200).send(resp);
  }).catch(err=>{
      res.status(400).send(err);
  })
}

exports.getCart= (req,res,next) =>{
     
    const products = req.body.user.getCartItem()
    
    let  productIds = [];
    for(let p of products){
        productIds.push(ObjectId(p.productId))
    }
  
    Product.find({ '_id': { $in: productIds } }).lean().then(prods =>{
      let productItems = prods
      products.forEach(p =>{
        productItems.forEach(pro =>{
          if(p.productId.toString() == pro._id.toString()){
            pro['quantity'] = p['quantity'];
          }
        })
      });

      return res.status(200).send(productItems);
    }).catch(err =>{
        res.status(200).send(err)
    });

}

exports.addItem = (req,res,next) => {
  console.log(req.body._id)
    const productId = req.body._id
    if(!req.body._id){
      return res.status(400).send('User Id is required');
    }
    Product.findById(productId).then(product =>{
      return req.body.user.addToCart(product)
    }).then(response =>{
        res.status(200).send(response)
     }).catch(err =>{
    res.status(400).send(err);
    })
}


exports.deleteProductFromCart = (req,res,next) =>{
  
  const userId = req.body.user._id;
  const productRemoveId = req.body.productId;

  if(!req.body.user._id){
    return res.status(400).send('User Id is required');
  }

  User.findById(userId).then(response =>{
    
    var cartItems ;
    cartItems = response.cart.items;
    var updatedCart = {};
    const index  = cartItems.findIndex(item =>{
        return item.productId == productRemoveId
    });
    updatedCart = response['cart']
    if(index >= 0){
      updatedCart['items'].splice(index,1);
     } else{
       return res.status(200).send('Product Dont Found')
    }

    var newvalues = {
          cart: updatedCart
    }

    User.findByIdAndUpdate(userId,newvalues).then(cart =>{
      res.status(200).send(cart)
    }).catch(err =>{
      res.status(200).send(err)
    })

  }).catch(err=>{
    console.log(err);
  })
}


exports.postOrder  = (req,res,next) =>{
  
  // console.log(req.body)
  const userId = req.body.user._id;

  if(!userId){
    return res.status(400).send('User Id is required');
  }  

  let userCart = req.body.user.cart.items;

  if(userCart.length == 0){
    return res.status(200).send('No Product in Cart')
  }

  let  productIds = [];
  for(let item of userCart){
      productIds.push(ObjectId(item.productId))
  }

  Product.find({ '_id': { $in: productIds } }).lean().then(prods =>{
    let productItems = prods
    console.log(prods)
    userCart.forEach(p =>{
      productItems.forEach(pro =>{
        if(p.productId.toString() == pro._id.toString()){
          pro['quantity'] = p['quantity'];
          pro.userDetails = req.body;
        }
      });
    });
    
    let updatedCart = {};
    updatedCart['items'] = [];

    var newvalues = {
          cart: updatedCart
    }
    User.findByIdAndUpdate(userId,newvalues).then(cart =>{
      var orderData = [];
      productItems.forEach(item =>{
      const obj  = {
        productId : item._id,
        price: item.price,
        userDetails: item.userDetails,
        productName: item.title,
        quantity:item.quantity,
        status:'ordered'
      }
      orderData.push(obj);
      });
      Order.insertMany(orderData).then(ordereddata=>{
        res.status(200).send(ordereddata)
      }).catch(err =>{
        res.status(400).send(err)
      })
  
    }).catch(err =>{
      res.status(200).send(err)
    })
  });

}