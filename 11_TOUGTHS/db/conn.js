const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughst', 'root', 'jailton123',{
    host:"localhost",
    dialect:"mysql"
})

try{    

    sequelize.authenticate()
    console.log('Connectd to database.');

}catch(err){
    console.log("Error to connect DB: "+err);
}

module.exports = sequelize;