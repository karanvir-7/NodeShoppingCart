const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) =>{
    try{
      
      const token  = req.header('Authorization');
      
      if(!token){
          throw new Error('Please Provide Token for authentication')
      }
     
      const decode = jwt.verify(token,'shoppingCart')

      const user = await User.findOne({'_id':decode._id,'tokens.token': token})
      console.log(user)

      if(!user){
        throw new Error();
      }

      req.body.user = user;
      next();
    }catch(err){
       res.status(401).send({error:err,message:"Invalid Token"});
    }
}

module.exports = auth;