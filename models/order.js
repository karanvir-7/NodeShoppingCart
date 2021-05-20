const mongoose  = require('mongoose');

const Schema  = mongoose.Schema;

const orderSchema = new Schema({
  productId:{
    type: String,
    required:true
  },
  productName:{
    type: String,
    required:true
  },
  price:{
    type: Number,
    required:true,
    validate(value){
      if(value < 0){
        throw new Error('Price cannot be negative')
      }
    }
  },
  userDetails:{
    type: Object,
    required:true
  },
  status:{
    type: String,
    required:true
  },
  quantity:{
    type:Number,
    required:true,
    validate(value){
      if(value < 0){
        throw new Error('quantity cannot be negative')
      }
    }
  }
},{
  timestamps:true
})

module.exports = mongoose.model('Order',orderSchema);