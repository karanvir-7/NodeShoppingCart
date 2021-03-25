
const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin')
const port = 3000;

const sequelize = require('./utils/database');

app.use(express.json())

app.use('/admin',adminRoutes);

sequelize.sync().then(resp=>{
    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`)
    })
}).catch(err=>{
    console.log(err);
});



