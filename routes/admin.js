const express = require('express');
const router = express.Router();
 
const adminController = require('../controllers/admin')

router.get('/getAllProducts',adminController.getAllProducts);

router.get('/getAllProductsById',adminController.getAllProductsById)

router.post('/addProduct',adminController.addProduct);

router.put('/editProduct',adminController.editProduct);

router.delete('/deleteProduct',adminController.deleteProduct)

router.get('/getOrders',adminController.getOrders);

router.get('/getOrderById',adminController.getOrderById);

router.put('/changeStatusOrder',adminController.changeStatus);

module.exports = router;