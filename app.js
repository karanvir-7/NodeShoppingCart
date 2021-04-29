
const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const port = 3000;

const dbConnect = require('./utils/database');
const User = require('./models/user');

app.use(express.json())

app.use((req,res,next)=>{
   User.findById('6083c5a92cb5a74c998147ad').then(user =>{
       req.body.user = user;
        // console.log(user)
       next();
   })
})

dbConnect()
.then(client =>{
    app.listen(port, () => { console.log(`app listening at http://localhost:${port}`)})
})
.catch(err =>{
        console.log(err);
});

app.use('/admin',adminRoutes);
app.use('/user',userRoutes)



// mongoConnect(()=>{
//     app.listen(port, () => {
//         console.log(`app listening at http://localhost:${port}`)
//     })
// })