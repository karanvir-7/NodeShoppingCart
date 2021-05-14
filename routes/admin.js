const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth')
const adminController = require('../controllers/admin')


router.post('/signUp',adminController.signUp);

router.post('/logIn',adminController.logIn);

router.post('/logOut',adminAuth,adminController.logOut);

router.post('/logOutAll',adminAuth,adminController.logOutAll);

router.get('/getAllProducts',adminAuth,adminController.getAllProducts);

router.get('/getAllProductsById',adminAuth,adminController.getAllProductsById)

router.post('/addProduct',adminAuth,adminController.addProduct);

router.put('/editProduct',adminAuth,adminController.editProduct);

router.delete('/deleteProduct',adminAuth,adminController.deleteProduct)

router.get('/getOrders',adminAuth,adminController.getOrders);

router.get('/getOrderById',adminAuth,adminController.getOrderById);

router.put('/changeStatusOrder',adminAuth,adminController.changeStatus);

module.exports = router;