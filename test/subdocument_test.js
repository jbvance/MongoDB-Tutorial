const assert = require('assert');
const User = require('../src/user');

describe ('Subdocuments', () => {

  it('can create a subdocument', (done) => {
    const joe =  new User(
      {name: 'Joe',
      posts: [{title: 'PostTitle'}]
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      }));
  });

  it('can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name:'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        user.posts.push({title: 'New Post'});
        // Must use return to return a value since we are using
        // a fat arrow function with curly braces. Without curly braces,
        // whatever is to the right of the fat arrow is automatically returned

        // Pushinga post on does NOT save it; you must save the
        // entire user record
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name:'Joe',
      posts: [{title: 'New Post'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });

});
