const mongoose  = require('mongoose');

const Schema  = mongoose.Schema;

const productSchema = new Schema({
  title:{
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
  description:{
    type: String,
    required:true
  },
  imageUrl:{
    type: String,
    required:true
  }
},{
  timestamps:true
})

module.exports = mongoose.model('Product',productSchema);
