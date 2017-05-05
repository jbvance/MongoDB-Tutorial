const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{ type: Schema.Types.ObjectId,
              ref: 'comment' }]
});

// Having a model means there will be a corresponding collection
const BlogPost = mongoose.model('blogPost', BlogPostSchema);
module.exports = BlogPost;
