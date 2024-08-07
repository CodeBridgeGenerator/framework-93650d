const assert = require('assert');
const app = require('../../src/app');

describe('\'codeEditor\' service', () => {
  it('registered the service', () => {
    const service = app.service('codeEditor');

    assert.ok(service, 'Registered the service (codeEditor)');
  });
});
