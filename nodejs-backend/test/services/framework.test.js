const assert = require('assert');
const app = require('../../src/app');

describe('\'framework\' service', () => {
  it('registered the service', () => {
    const service = app.service('framework');

    assert.ok(service, 'Registered the service (framework)');
  });
});
