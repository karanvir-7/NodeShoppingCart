
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin')
const port = 3000;

const db = require('./utils/database');

app.use(express.json())

app.use('/admin',adminRoutes);


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})

