const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  // The done function lets mocha know it's ok to
  // go ahead and move on
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' });

    joe.save()
      .then(() => {
        // The isNew value gets changed from true to false
        // once the record is saved to the database.
        assert(!joe.isNew);
        done();
      });
  });
});
