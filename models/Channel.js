const mongoose = require('mongoose');
const User = require ('./User')
const Event = require('./Event')

const Schema = mongoose.Schema;

const channelSchema = new mongoose.Schema({
  name: String, 
  events: [Event.schema]
})


module.exports = mongoose.model('Channel', channelSchema);