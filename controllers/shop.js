const Product  = require('../models/products.js');

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
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
      .getCart()
      .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } });
      })
      .then(products => {
        let product;
        console.log(products)
        if (products.length > 0) {
          product = products[0];
        }
    
        if (product) {
          const oldQuantity = product.cartItem.quantity;
          newQuantity = oldQuantity + 1;
          return product;
        }
        return Product.findByPk(prodId);
      })
      .then(product => {
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity }
        });
      })
      .then(() => {
        res.status(200).send('Cart Updated Succesfully')
      })
      .catch(err => console.log(err));
    
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