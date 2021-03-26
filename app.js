
const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin')
const port = 3000;

const sequelize = require('./utils/database');
const Product = require('./models/products');
const User = require('./models/user');

app.use(express.json())

app.use((req,res,next)=>{
    User.findAll({
        where: {
            id:1
        }
    }).then(user =>{
        req.user = user;
        next();
    }).catch(err=>{
        console.log(err)
    });
})
app.use('/admin',adminRoutes);

Product.belongsTo(User,{constraint: true, onDelete:'CASCADE'});
User.hasMany(Product);

sequelize.sync().then(resp=>{
    return User.findAll({
        where: {
            id:1
        }
    });
}).then(user =>{
   // console.log(user);
    if(user.length == 0){
        return User.create({ name:'karan',email:'karanvirvirdi186@gmail.com'});
    }
    return user;
}).then(user =>{
   // console.log(user)
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`)
    })
}).catch(err=>{
    console.log(err);
});



