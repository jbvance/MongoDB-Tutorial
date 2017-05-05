const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'user'} //Makes a reference called user which will be assoc with 'user' collection
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
