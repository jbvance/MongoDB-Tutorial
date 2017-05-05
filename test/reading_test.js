const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
 // declare joe as this level b/c if you declare it in the beforeEach
 // block, it won't be available in the "it" blocks b/c of scoping
  let joe, maria, alex, zach;

  beforeEach((done) => {
    alex = new User({name: 'Alex'});
    joe = new User({name: 'Joe'});
    maria = new User({name: 'Maria'});
    zach = new User({name: 'Zach'});
    Promise.all([ joe.save(), maria.save(), zach.save(), alex.save()])
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
      User.find({ name: 'Joe' })
        .then((users) => {
          assert(users[0]._id.toString() === joe._id.toString());
          done();
        });
    });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
    .then((user) => {
      assert(user.name === 'Joe');
      done();
    });
  });

  // When sorting, 1 is ascending and -1 is descending
  it('can order, skip and limit the result set', (done) => {
      User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users)=> {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      })
  });

});
