const db = require('../db/conn');
const { DataTypes } = require('sequelize')

const User = db.define('user',{
    name:{
        type: DataTypes.STRING,
        require: true
    },
    email:{
        type: DataTypes.STRING,
        require: true
    },
    password:{
        type: DataTypes.STRING,
        require: true
    }
})

module.exports = User;