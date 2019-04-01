const mongoose = require('mongoose');
const User = require ('./User')

const Schema = mongoose.Schema;

const channelSchema = new mongoose.Schema({
  name: String,
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
})


module.exports = mongoose.model('Channel', channelSchema);