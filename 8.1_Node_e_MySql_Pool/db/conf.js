const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit:10,
    user:"root",
    password:"jailton123",
    host:"localhost",
    database:"nodemysql"
}) 

module.exports = pool;