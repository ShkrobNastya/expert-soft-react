const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Blogs = mongoose.model('Blogs', blogsSchema);

module.exports = Blogs;