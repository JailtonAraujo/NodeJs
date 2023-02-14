const mongoose = require('mongoose');

async function run (){

    mongoose.connect("mongodb://localhost:27017/getapet_db");
    console.log('Connected to db!');
}

run();

module.exports = mongoose;