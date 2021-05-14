const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const adminAuth = async (req,res,next) =>{
    try{
      
      const token  = req.header('Authorization');
      
      if(!token){
          throw new Error('Please Provide Token for authentication')
      }
     
      const decode = jwt.verify(token,'shoppingCart')

      const user = await Admin.findOne({'_id':decode._id,'tokens.token': token})
      // console.log(user,'afd')

      if(!user){
        throw new Error();
      }

      req.body.admin = user;
      req.body.token = token;

      next();
  
    }catch(err){
       res.status(401).send({error:err,message:"Invalid Token"});
    }
}

module.exports = adminAuth;