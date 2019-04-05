const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  text: String
})


module.exports = mongoose.model('Post', postSchema);