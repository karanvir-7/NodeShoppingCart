require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

let _db;

const mongoConnect = (callback) =>{
    MongoClient.connect(`mongodb+srv://${process.env.DB_USER1}:${process.env.DB_PASSWORD1}@shoppingcart.vzgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(client =>{
        console.log('connected');
        _db = client.db();
        callback(client)
    })
    .catch(err =>{
        console.log(err);
    });
}

const getDb = () =>{
    if(_db){
        return _db;
    }
    throw 'No Database Found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb
//mongodb+srv://<username>:<password>@shoppingcart.vzgsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority