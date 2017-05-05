const mongoose = require('mongoose');

//global.promise is an es6 implementation of a promise library
mongoose.Promise = global.Promise;

//before is only run once before all tests run
before((done) => {
  mongoose.connect('mongodb://localhost:27017/users_test');
  mongoose.connection
    .once('open', () => {done();})
    .on('error', (error) => {
      console.warn('Warning', error);
    });

});


//Drop collection of users before each test
beforeEach((done) => {
  //When mongoose loads up the collections to MongoDB, it normalizes
  // all the collection names to be all lower case. So, you have to use
  // blogposts rather than blogPosts
  const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
      comments.drop(() => {
        blogposts.drop(() => {
          done();
        })
      })
  });
});
