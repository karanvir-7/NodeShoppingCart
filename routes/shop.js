const express = require('express');
const router = express.Router();
const auth  = require('../middleware/auth');
const shopController = require('../controllers/shop')

router.post('/signUp',shopController.signUp);

router.post('/logIn',shopController.logIn);

router.post('/forgotPassword',shopController.forgotPassword);

router.post('/resetPassword',shopController.resetPassword);

router.post('/logOut',auth,shopController.logOut);

router.post('/logOutAll',auth,shopController.logOutAll);

router.get('/getCartItems',auth,shopController.getCart);

router.post('/addItemInCart',auth,shopController.addItem)

router.get('/getAllProducts',auth,shopController.getAllProducts);

router.get('/getSingleProduct',auth,shopController.getAllProductsById);

router.delete('/deleteProductFromCart',auth,shopController.deleteProductFromCart);

router.post('/create-order',auth,shopController.postOrder)



module.exports = router;