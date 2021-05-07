const User = require('../models/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async(req,res,next)=>{
    console.log(req.body)

    const encryptedPassword = await bcrypt.hash(req.body.password,8)
    console.log(encryptedPassword);
     const name = req.body.name;
     const email = req.body.email;
     const password = encryptedPassword

     const obj = new User({
        name:name,
        email:email,
        password:password,
        cart:{items:[]}
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
      const user = await User.findByCredentials(req.body.email,req.body.password)
      
      var token = await jwt.sign({ _id: user._id.toString() }, 'shoppingCart');
      
      user.tokens = user.tokens.push({token:token});
      
    //   console.log(user)

      const u = new User(user)
      await u.save();

      res.status(200).send({user,token});
   }catch(e){
      res.status(400).send(e);
   }
}