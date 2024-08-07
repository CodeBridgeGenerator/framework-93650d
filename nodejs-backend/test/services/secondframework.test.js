const assert = require('assert');
const app = require('../../src/app');

describe('\'secondframework\' service', () => {
  it('registered the service', () => {
    const service = app.service('secondframework');

    assert.ok(service, 'Registered the service (secondframework)');
  });
});
