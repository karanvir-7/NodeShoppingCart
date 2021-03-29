const Product  = require('../models/products.js');

exports.getAllProducts = (req,res,next) => {
    Product.findAll().then(resp=>{
        res.status(200).send(resp);
    }).catch(err=>{
        res.status(400).send(err);
    })
}

exports.getAllProductsById = (req,res,next) => {
    const id = req.query.id;
    Product.findByPk(id).then(resp=>{
        res.status(200).send(resp);
    }).catch(err=>{
        res.status(400).send(err);
    })

}

exports.addProduct = (req,res,next) =>{
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    // console.log(req.user[0]['dataValues']['id'],'sa')

    Product.create({
        title: title,
        price: price,
        description:description,
        imageUrl:imageUrl,
        userId:req.user[0]['dataValues']['id']
    }).then(resp=>{
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
    const productId = req.body.id;
    Product.update({ 
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl,
        userId:req.user[0]['dataValues']['id']
     },{
        where: {
           id: productId
        }
    }).then(resp=>{
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