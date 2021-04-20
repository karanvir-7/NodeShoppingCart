const Product  = require('../models/products.js');

exports.getAllProducts = (req,res,next) => {
    Product.getAllProducts().then(response =>{
        res.status(200).send(response)
    })
    .catch(err =>{
        res.status(200).send(err);
    })
}

exports.getAllProductsById = (req,res,next) => {
    const id = req.query.id;
    Product.getProductById(id).then(data =>{
        res.status(200).send(data)
     }).catch(err =>{
        res.status(200).send(err);
    });
}

exports.addProduct = (req,res,next) =>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const obj = new Product(title,price,description,imageUrl);
    console.log(obj)
    obj.save().then(response =>{
        console.log(response)
        res.status(200).send('product added successfully')
    }).catch(err =>{
        res.status(400).send(err);
    })
}

exports.editProduct = (req,res,next)=>{

    var newvalues = {
        $set: {
            title : req.body.title,
            price : req.body.price,
            description : req.body.description,
            imageUrl : req.body.imageUrl
        } 
    }
    
    Product.updateProductDetails(productId,newvalues).then(resp=>{
        res.status(200).send('Product Updated Successfully');
    }).catch(err=>{
        res.status(400).send(err);
    });
}

exports.deleteProduct = (req,res,next) =>{

    const productId = req.query.id;
    Product.destroy({
        where: {
          id: productId
        }
    }).then(resp=>{
        res.status(200).send('Product Deleted Successfully');
    }).catch(err=>{
        res.status(400).send(err);
    })
}