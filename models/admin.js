const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true,
    trim:true
  },
  email:{
    type: String,
    unique:true,
    required:true,
    validate(val){
      if(!validator.isEmail(val)){
        throw new Error('Email is invalid')
      }
    }
  },
  password:{
    type: String,
    required:true,
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
});

adminSchema.statics.findByCredentials = async(email, password) =>{

    const user = await Admin.findOne({email:email});
   
    if(!user){
        throw new Error('Unable to log In')
    }

    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch){
      throw new Error('credentials are wrong');
    }
    console.log(user)
    return user;      
}

const Admin = mongoose.model('Admin',adminSchema);

module.exports = mongoose.model('Admin',adminSchema);