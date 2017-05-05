const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe ('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe =  new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yep, it really is'});

      // Mongoose will only use ObjectId even though we are pushing the
      // entire blogPost
      joe.blogPosts.push(blogPost);

      //Take an array of promises and combine them into a single promise,
      // because we don't know how to chain the saves together because we
      // don't know which one will finish last
      Promise.all([joe.save(), blogPost.save()])
        .then(() => done());
  });

it('users clean up dangling blogPosts on remove', (done) => {
  joe.remove()
    .then(() => BlogPost.count())
    .then((count) => {
      assert(count === 0);
      done();
    });
});

});
