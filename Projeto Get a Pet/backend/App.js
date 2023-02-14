require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

//Solve cors
app.use(cors({credentials: true,origin:'http://localhost:3000'}));

const conn = require('./db/conn');

//Routes import
const UserRoutes = require('./routes/UserRoutes');

//Config json response
app.use(express.json());

//statics folder
app.use(express.static('public'));

//Routes - Endpoints
app.use('/users',UserRoutes);

app.listen(5000,()=>{
    console.log('App running in port 5000...');
})


