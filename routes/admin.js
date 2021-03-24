const express = require('express');
const router = express.Router();
 
const adminController = require('../controllers/admin')

router.get('/getAllProducts',adminController.getAllProducts);

router.get('/getAllProductsById',adminController.getAllProductsById)

router.post('/addProduct',adminController.addProduct);

router.put('/editProduct',adminController.editProduct);

router.delete('/deleteProduct',adminController.deleteProduct)

module.exports = router;