const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new mongoose.Schema({
  name: String,
})


module.exports = mongoose.model('Channel', channelSchema);