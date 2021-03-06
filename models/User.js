const mongoose = require('mongoose');
const Channel = require ('./Channel')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ ,
    },
  password: { type: String, required: true , select: false},
  img: "",
  userChannels:[]
})

module.exports = mongoose.model('User', userSchema);