const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/testmongodb';

const client = new MongoClient(uri);

async function run(){

    try{
        await client.connect();
        console.log('connected to mongoDB!');
    }catch(err){
        console.log(err)
    }

}

run();

module.exports = client;