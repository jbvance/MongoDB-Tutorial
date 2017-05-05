const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  //blogPosts was introduced as a way to show
  // how to create assocation references
  blogPosts: [{ type: Schema.Types.ObjectId,
                ref: 'blogPost'
  }]
});

//Add a virtual field which is NOT saved in the database
//Do NOT use fat arrows when using getter and setter methods
//because  you use 'this' in the function
UserSchema.virtual('postCount').get(function(){
  // You can use 'this' to reference any properties
  // of the instance of the user
  return this.posts.length;
});

// Middleware - The hooks are init, validate, save, and remove
// DO NOT USE 'this b/c this inside here refers to model instance'
// (ex) this === joe is true
// You must call any middleware with a callback of next
UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  //this.blogPosts is an array of blogPost _id's
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
})

// Having a model means there will be a corresponding collection
const User = mongoose.model('user', UserSchema);

module.exports = User;
