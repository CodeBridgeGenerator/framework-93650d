const assert = require('assert');
const app = require('../../src/app');

describe('\'servicechanges\' service', () => {
  it('registered the service', () => {
    const service = app.service('servicechanges');

    assert.ok(service, 'Registered the service (servicechanges)');
  });
});
