const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    unique:true,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  cart:{
    items:[{productId:{},quantity:{}}]
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
})
  
userSchema.methods.addToCart = function(product){
    const index = this.cart.items.findIndex(item =>{
      return item.productId.toString() == product._id.toString();
    });

    let updatedCart = this.cart.items
    
    if(index >= 0){
      updatedCart[index].quantity = this.cart['items'][index].quantity + 1;
    }else{
      updatedCart.push({productId : product._id,quantity : 1})
    }

    const updatedCartNew = {
       items : updatedCart
    }
     
    this.cart = updatedCartNew;
    return this.save();

}


userSchema.methods.getCartItem = function(){

    if(this.cart.items.length == 0){
      return 'cart is empty';
    }

    return this.cart['items'];
}

userSchema.methods.toJSON = function(){
   
    let user = this;
    let userData = user.toObject();
    delete userData.password;
    delete userData.tokens;

    return userData;
}

userSchema.statics.findByCredentials = async(email, password) =>{

      const user = await User.findOne({email:email});

      if(!user){
          throw new Error('Unable to log In')
      }

      const isMatch = await bcrypt.compare(password,user.password)

      if(!isMatch){
        throw new Error('credentials are wrong');
      }
       
      return user;      
}

const User = mongoose.model('user',userSchema);

module.exports = mongoose.model('user',userSchema);


