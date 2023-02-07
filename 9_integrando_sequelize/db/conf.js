const { Sequelize } = require ('sequelize');

const sequelize = new Sequelize('nodemysql','root','jailton123',{
    host:"localhost",
    dialect:"mysql"
});


// try{
//     sequelize.authenticate();
//     console.log("Connected to DB");
// }catch(err){
//     console.log("error in connection: "+err);
// }

module.exports = sequelize;