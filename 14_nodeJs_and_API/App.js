const express = require('express');

const app = express();

app.use(
    express.urlencoded({
        extended:true
    }),
)

app.use(express.json());

//Routes - endpoints

app.post('/',(req, res)=>{

    const {name, lastname, age} = req.body;

    console.log(`${name} - ${lastname} - ${age}`);

    res.status(201).json();

})

app.get('/',(req, res)=>{

    res.status(200).json({message:'App running..'});

})

app.listen(3000);