
const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin')
const port = 3000;

const db = require('./utils/database');


app.use('/admin',adminRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})


db.execute('SELECT * FROM products').then(res=>{
    console.log(res[0]);
}).catch(err=>{
    console.log(err);
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

