const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
 // declare joe as this level b/c if you declare it in the beforeEach
 // block, it won't be available in the "it" blocks b/c of scoping
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe', likes: 0});
    joe.save()
      .then(() => done());
  });

function assertName(operation, done){
  operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length ===1);
      assert(users[0].name === 'Alex');
      done();
    });
}


  it('instance type set and save', (done) => {
      //Setting only updates in memory, does NOT save to database
      joe.set('name', 'Alex');
    assertName(joe.save(), done);

    });

    it('A model instance can update', (done) => {
      //update both sets and saves in one call
      assertName(joe.update({ name: 'Alex' }), done);
    });

    it('A model class can update', (done) => {
      // Update many users with the given criteria
      assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
    });


    it('A model class can update one record', (done) => {
      assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),done);
    });


    it('A model class can find a record with an Id and update', (done) => {
      assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }),done);
    });

    //Puting 'xit' rather than 'it' will exclude it form the test suite
    it('A user can have their likes incremented by 1', (done) => {
        User.update({ name: 'Joe' }, { $inc: {likes: 1} })
          .then(() => User.findOne({ name: 'Joe' }))
          .then((user) => {
            assert(user.likes === 1);
            done();
          })
    });

});
