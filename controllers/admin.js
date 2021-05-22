const Product  = require('../models/products.js');
const Order = require('../models/order');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
// var ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');

exports.signUp = async(req,res,next)=>{
    console.log(req.body)
  
    const encryptedPassword = await bcrypt.hash(req.body.password,8)
  
     const name = req.body.name;
     const email = req.body.email;
     const password = encryptedPassword
  
     const obj = new Admin({
        name:name,
        email:email,
        password:password,
    });
  
    obj.save().then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(400).send(err)
    })
  }
  
  exports.logIn = async (req,res,next) =>{
    //console.log(req.body)
   
   try{
    //  console.log(req.body,'asdf')
      const admin = await Admin.findByCredentials(req.body.email,req.body.password)
    //   console.log(admin)
      var token = await jwt.sign({ _id: admin._id.toString() }, 'shoppingCart');
    //   console.log(token)
      admin.tokens = admin.tokens.push({token:token});    
    //   console.log(admin)
  
      const u = new Admin(admin);

      await u.save();
  
      res.status(200).send({admin,token});
   }catch(e){
      res.status(400).send(e);
   }
  }
  
  exports.logOut = async (req,res) =>{
      try{
        // console.log(req.body.admin.tokens)
          req.body.admin.tokens = req.body.admin.tokens.filter(token =>{
            // console.log(token.token,req.body.token)
            return token.token != req.body.token
          });
          // console.log(req.body.user)
          const admin  = new Admin(req.body.admin);
          await admin.save();
  
          res.status(200).send('Logged Out Successfully');

      }catch(error){
        res.status(500).send({error:error,message:'Unable to Log Out'})
      }
  }
  
  exports.logOutAll = async (req,res) =>{
    try{
         req.body.admin.tokens = [];
        // console.log(req.body)
        const admin  = new Admin(req.body.admin);
        await admin.save();
  
        res.status(200).send('Logged Out from all Devices Successfully');
    }catch(error){
      res.status(500).send({error:error,message:'Unable to Log Out'})
    }
  }


exports.getAllProducts = async(req,res,next) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    let page =  req.query.page ? parseInt(req.query.page) : 1;
    var searchString = req.query.search ? req.query.search : '';

    let condition = { $or:[
        { title:  { $regex: searchString, $options: "i" } },
        { description: { $regex: searchString, $options: "i" } }
    ]};
    
    try{
        let products = await Product.find(condition).limit(limit).skip((page-1)*limit).sort({price:"asc"});
        res.status(200).send(products)
    }catch(e){
        res.status(400).send(e);
    }
    
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

    const obj = new Product({
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl
    });

    obj.save().then(response =>{
        res.status(200).send('product added successfully')
    }).catch(err =>{
        res.status(400).send(err);
    });
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
        res.status(200).send({message:'Product Update Successfully',product:result})
    }).catch(err =>{
        res.status(400).send(err)
    });
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

exports.getOrders = (req,res,next) =>{
    
    Order.find().then(response =>{
        res.status(200).send(response)
    }).catch(err =>{
        res.status(200).send(err);
    });

}

exports.getOrderById = (req,res,next) => {
 
    const id = req.query.id;
 
    Order.findById(id).then(data =>{
        res.status(200).send(data)
     }).catch(err =>{
        res.status(200).send(err);
    });
}

exports.changeStatus = (req,res,next) =>{

    console.log(req.body);
    const orderId = req.body.orderId;
    const status = req.body.status;

    Order.findByIdAndUpdate(orderId,{status:status}).then(cart =>{
        res.status(200).send({message:'Status changed Successfully',cartDetails:cart})
    }).catch(err =>{
        res.status(200).send(err)
    });
  

}