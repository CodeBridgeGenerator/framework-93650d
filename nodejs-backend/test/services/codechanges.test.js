const assert = require('assert');
const app = require('../../src/app');

describe('\'codechanges\' service', () => {
  it('registered the service', () => {
    const service = app.service('codechanges');

    assert.ok(service, 'Registered the service (codechanges)');
  });
});
