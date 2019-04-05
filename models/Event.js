const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User= require ('./User')

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  channel_id: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})


module.exports = mongoose.model('Event', eventSchema);