const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe =  new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yep, it really is'});
    comment = new Comment({content: 'Congrats on a great post'});

      // Mongoose will only use ObjectId even though we are pushing the
      // entire blogPost, comment, or joe object
      joe.blogPosts.push(blogPost);
      blogPost.comments.push(comment);
      comment.user = joe;

      //Take an array of promises and combine them into a single promise,
      // because we don't know how to chain the saves together because we
      // don't know which one will finish last
      Promise.all([joe.save(), blogPost.save(), comment.save()])
        .then(() => done());
  });

  it('saves a relation between a user and a blog post', (done) => {
    User.findOne({name: 'Joe'})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({name: 'Joe'})
      .populate({
        path: 'blogPosts', //look into user object and load the associations
        //now take the path and go into it and try to load up additional associations
        populate: {
          //Inside of the blogPosts, load up all comments for that blogPost
          path: 'comments',
          model: 'comment',
          // Now we're going one level deeper and getting user object associated
          // with the comment
          populate: {
              path: 'user',
              model: 'user'
          }
        }
      })
      .then((user) => {
        //console.log(user.blogPosts[0].comments[0]);
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on a great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });

});
