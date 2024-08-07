const assert = require('assert');
const app = require('../../src/app');

describe('\'environments\' service', () => {
  it('registered the service', () => {
    const service = app.service('environments');

    assert.ok(service, 'Registered the service (environments)');
  });
});
