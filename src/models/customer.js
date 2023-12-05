'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name:{
        type: String,
        require: true,
        trim: true,
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    roules:[{
        type: String,
        required: true,
        enum:['user', 'admin'],
        default: 'user',
    }],
});

module.exports = mongoose.model('Customer', schema);