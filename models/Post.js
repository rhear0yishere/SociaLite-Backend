const mongoose = require('mongoose');
const Comment = require('./Comment')

const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  text: String,
  comments: [Comment.schema]

})


module.exports = mongoose.model('Post', postSchema);