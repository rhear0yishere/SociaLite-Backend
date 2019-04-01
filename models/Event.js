const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User= require ('./User')

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String, 
  user: [User.schema]

})


module.exports = mongoose.model('Event', eventSchema);