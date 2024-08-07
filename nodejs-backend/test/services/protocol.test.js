const assert = require('assert');
const app = require('../../src/app');

describe('\'protocol\' service', () => {
  it('registered the service', () => {
    const service = app.service('protocol');

    assert.ok(service, 'Registered the service (protocol)');
  });
});
