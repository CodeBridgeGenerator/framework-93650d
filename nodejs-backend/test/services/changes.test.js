const assert = require('assert');
const app = require('../../src/app');

describe('\'changes\' service', () => {
  it('registered the service', () => {
    const service = app.service('changes');

    assert.ok(service, 'Registered the service (changes)');
  });
});
