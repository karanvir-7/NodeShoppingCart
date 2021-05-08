const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const port = 3000;

const dbConnect = require('./utils/database');
const User = require('./models/user');

app.use(express.json())

app.use('/admin',adminRoutes);
app.use('/user',userRoutes);

dbConnect()
.then(client =>{
    app.listen(port, () => { console.log(`app listening at ${port}`)})
})
.catch(err =>{
        console.log(err);
});


     