
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;

const mongoConnect = (callback) =>{
    MongoClient.connect(`mongodb+srv://shoppingUser:9779kanty@shoppingcart.vzgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(client =>{
        console.log('connected');
        callback(client)
    })
    .catch(err =>{
        console.log(err);
    });
}

module.exports = mongoConnect;
//mongodb+srv://<username>:<password>@shoppingcart.vzgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority