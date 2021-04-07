
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;

const mongoConnect = (callback) =>{
    MongoClient.connect(`mongodb+srv://${process.env.DB_USER1}:${process.env.DB_PASSWORD1}@shoppingcart.vzgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
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