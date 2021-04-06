
const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');
const port = 3000;

const mongoConnect = require('./utils/database');

app.use(express.json())

app.use((req,res,next)=>{
})

app.use('/admin',adminRoutes);
app.use('/user',userRoutes)



mongoConnect((client)=>{
    console.log(client);
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`)
    })
})