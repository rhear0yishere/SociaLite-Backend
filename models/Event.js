const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./Post')

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  term: String,
  image: String,
  date: String, 
  time:String, 
  posts: [Post.schema]
})


module.exports = mongoose.model('Event', eventSchema);