
const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const port = 3000;

const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

app.use(express.json())

app.use((req,res,next)=>{
    User.findById('6081bbd7fcd24696760f03b8').then(user =>{
        req.user = user;
        console.log(user)
        next();
    })
})

app.use('/admin',adminRoutes);
app.use('/user',userRoutes)



mongoConnect(()=>{
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`)
    })
})