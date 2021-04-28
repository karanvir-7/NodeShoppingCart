const Product  = require('../models/products.js');

exports.getAllProducts = (req,res,next) => {
    Product.find().then(response =>{
        res.status(200).send(response)
    })
    .catch(err =>{
        res.status(200).send(err);
    })
}

exports.getAllProductsById = (req,res,next) => {
    const id = req.query.id;
    Product.findById(id).then(data =>{
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
    // console.log(req.user[0]._id)
    const obj = new Product({
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl
    });
    obj.save().then(response =>{
        console.log(response)
        res.status(200).send('product added successfully')
    }).catch(err =>{
        res.status(400).send(err);
    })
}

exports.editProduct = (req,res,next)=>{

    const productId = req.body._id;
    
    if(!productId){
     return res.status(400).send('Product Id is Required')
    }

    Product.findById(productId).then(product =>{
        product.title = req.body.title,
        product.price = req.body.price,
        product.description = req.body.description,
        product.imagUrl = req.body.imageUrl
        return product.save()
    }).then(result =>{
        res.status(200).send('Product Update Successfully')
    }).catch(err =>{
        res.status(400).send(err)
    })
}

exports.deleteProduct = (req,res,next) =>{

    const productId = req.query.id;

    if(!productId){
        return res.status(400).send('Please provide Product Id')
    }
    Product.findByIdAndDelete(productId).then(resp=>{
        res.status(200).send('Product Deleted Successfully');
    }).catch(err=>{
        res.status(400).send(err);
    });

}