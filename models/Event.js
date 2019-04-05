const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./Post')

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  posts: [Post.schema]
})


module.exports = mongoose.model('Event', eventSchema);