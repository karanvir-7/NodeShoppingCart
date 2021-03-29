const express = require('express');
const router = express.Router();
 
const shopController = require('../controllers/shop')

router.get('/getCartItems',shopController.getAllItems);

router.post('addItemInCart',shopController.addItem)

module.exports = router;