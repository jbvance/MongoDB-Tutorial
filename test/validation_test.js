const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it ('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    // If you needed to reach out to database, you could use asynchronous validation:
    // user.validate((validationResult) => {xxxxxxxx});

    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');

  });

  it ('requires a user\'s name longer than 2 characters', (done) => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    // If you needed to reach out to database, you could use asynchronous validation:
    // user.validate((validationResult) => {xxxxxxxx});
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.');
    done();
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({name: 'Al'});
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.');
        done();
      });    
  });


});
