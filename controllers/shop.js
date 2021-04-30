
const Product  = require('../models/products.js');
const User = require('../models/user');
const Order = require('../models/order');

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
    // User.getCartProducts(productIds).then(products =>{
    //     products.forEach(product => {
    //       items.forEach(prod =>{
    //          if(prod.productId == product._id){
    //            product.quantity = prod.quantity
    //          }
    //       });
    //     });
    //    return res.status(200).send(products);
    //   })
      
    // }).catch(err =>{
    //     res.status(200).send(err)
    // })
    // User.checkExistingProduct(userId).then(response =>{

    //   if(!response[0].cart.items){
    //     return res.status(200).send('Cart is Empty')
    //   }

    //   let productIds = [];
    //   var items = response[0].cart.items;
    //   for(let product of response[0].cart.items){
    //     productIds.push(ObjectId(product.productId))
    //   }

    //   User.getCartProducts(productIds).then(products =>{
    //     products.forEach(product => {
    //       items.forEach(prod =>{
    //          if(prod.productId == product._id){
    //            product.quantity = prod.quantity
    //          }
    //       });
    //     });
    //    return res.status(200).send(products);
    //   })
      
    // }).catch(err =>{
    //     res.status(200).send(err)
    // })

}

exports.addItem = (req,res,next) => {
  console.log(req.body._id)
    const productId = req.body._id
    if(!req.body._id){
      return res.status(400).send('User Id is required');
    }
   // console.log(productId)
    Product.findById(productId).then(product =>{
      return req.body.user.addToCart(product)
    }).then(response =>{
        res.status(200).send(response)
     }).catch(err =>{
    res.status(400).send(err);
    })
    // User.checkExistingProduct(userId).then(response =>{

    //    var body  = req.body;
    //    delete body.user;
    //    var cartItems
    //    var updatedCart = {};
    //    if(response[0]['cart'].items){
    //     cartItems = response[0].cart.items
    //     const index  = cartItems.findIndex(item =>{
    //         return item.productId == product._id
    //     })
    //     updatedCart = response[0]['cart']
    //     if(index >= 0){
    //         updatedCart['items'][index].quantity = response[0].cart['items'][index].quantity + 1;
    //       } else{
    //          updatedCart['items'].push({productId:product._id,quantity:1})
    //      }
    //    }
    //    else{
    //       updatedCart['items'] = [];
    //       updatedCart['items'].push({productId:product._id,quantity:1});
    //    }

    //    var newvalues = {
    //         $set: {
    //             username : response[0].name,
    //             email : response[0].email,
    //             cart: updatedCart
    //         } 
    //     }

    //     User.updateCart(userId,newvalues).then(cart =>{
    //       res.status(200).send(cart)
    //     }).catch(err =>{
    //       res.status(200).send(err)
    //     })
      
    // });
  
    
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