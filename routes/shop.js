const express = require('express');
const router = express.Router();
 
const shopController = require('../controllers/shop')
const authController = require('../controllers/auth');
router.get('/getCartItems',shopController.getCart);

router.post('/addItemInCart',shopController.addItem)

router.get('/getAllProducts',shopController.getAllProducts);

router.get('/getSingleProduct',shopController.getAllProductsById);

router.delete('/deleteProductFromCart',shopController.deleteProductFromCart);

router.post('/create-order',shopController.postOrder)

router.post('/signUp',authController.signUp);

router.post('/logIn',authController.logIn);

module.exports = router;