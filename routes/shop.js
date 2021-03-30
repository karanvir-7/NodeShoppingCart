const express = require('express');
const router = express.Router();
 
const shopController = require('../controllers/shop')

router.get('/getCartItems',shopController.getCart);

router.post('/addItemInCart',shopController.addItem)

module.exports = router;