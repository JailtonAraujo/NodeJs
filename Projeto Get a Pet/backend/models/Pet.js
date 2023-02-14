const mongoose = require('../db/conn');
const { Schema } = require('mongoose');

const Pet = new mongoose.model(
    "Pet",
    new Schema({
        name:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        wight:{
            type:Number,
            required:true
        },
        images:{
            type:Array,
            required:true
        },
        available:{
            type:Boolean
        },
        user:Object,
        
    },{timestamps:true})
)

module.exports = Pet;