const express = require('express');
const router = express.Router();
 
const shopController = require('../controllers/shop')

router.get('/getCartItems',shopController.getCart);

router.post('/addItemInCart',shopController.addItem)

router.get('/getAllProducts',shopController.getAllProducts);

router.get('/getSingleProduct',shopController.getAllProductsById);

router.delete('/deleteProductFromCart',shopController.deleteProductFromCart);

router.post('/create-order',shopController.postOrder)

module.exports = router;