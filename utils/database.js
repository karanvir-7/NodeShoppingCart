const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    database:"ShoppingDatabase",
    password:"****@****",
})


module.exports = pool.promise();