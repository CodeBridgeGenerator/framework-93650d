const assert = require('assert');
const app = require('../../src/app');

describe('\'servicegen\' service', () => {
  it('registered the service', () => {
    const service = app.service('servicegen');

    assert.ok(service, 'Registered the service (servicegen)');
  });
});
