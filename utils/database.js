require('dotenv').config()
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const dbConnect = ( () => {
   return mongoose.connect(`mongodb+srv://${process.env.DB_USER1}:${process.env.DB_PASSWORD1}@shoppingcart.vzgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true})
}) 

module.exports = dbConnect;