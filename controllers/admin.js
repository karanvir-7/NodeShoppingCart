const Product  = require('../models/products.js');

exports.getAllProducts = (req,res,next) => {
    Product.fetchAll().then(resp=>{
        res.status(200).send(resp[0]);
    }).catch(err=>{
        res.status(400).send(err);
    })
}

exports.getAllProductsById = (req,res,next) => {
    const id = req.query.id;
    Product.fetchProductById(id).then(resp=>{
        if(resp[0].length == 0){
            res.status(200).send('No Product Found')
        }else{
            res.status(200).send(resp[0]);
        }         
    }).catch(err=>{
        res.status(400).send(err);
    })
}

exports.addProduct = (req,res,next) =>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const product  = new Product(null,title,imageUrl,description,price);
    product.save().then(resp=>{
        res.status(200).send('Product Added Successfully')
    }).catch(err=>{
        res.status(400).send(err);
    })
}

exports.editProduct = (req,res,next)=>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const product = new Product(null,title,imageUrl,description,price)
    product.update(req.body.id).then(resp=>{
        res.status(200).send('Product Updated Successfully');
    }).catch(err=>{
        res.status(400).send(err);
    })
}

exports.deleteProduct = (req,res,next) =>{

    const productId = req.query.id;
    Product.deleteById(productId).then(resp=>{
        res.status(200).send('Product Deleted Successfully');
    }).catch((err)=>{
        res.status(400).send(err);
    })
}