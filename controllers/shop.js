const Product  = require('../models/products.js');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');


exports.getCart= (req,res,next) =>{
    req.user.getCart().then(cart => {
        console.log('-----')
       return cart.getProducts();
    }).then(products =>{
        res.status(200).send(products)
    }).catch(err =>{
        console.log(err);
    })
}

exports.addItem = (req,res,next) => {
    const prodId = req.body.productId;
    console.log(prodId)
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