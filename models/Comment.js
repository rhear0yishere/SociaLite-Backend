const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  text: String,
})


module.exports = mongoose.model('Comment', commentSchema);