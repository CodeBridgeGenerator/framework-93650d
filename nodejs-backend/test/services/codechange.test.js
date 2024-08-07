const assert = require('assert');
const app = require('../../src/app');

describe('\'codechange\' service', () => {
  it('registered the service', () => {
    const service = app.service('codechange');

    assert.ok(service, 'Registered the service (codechange)');
  });
});
