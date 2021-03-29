const Product  = require('../models/products.js');
const Cart = require('../models/cart');


exports.getAllItems = (req,res,next) =>{
    console.log(req.user)
}

exports.addItem = (req,res,next) => {
    console.log(req.body)
}