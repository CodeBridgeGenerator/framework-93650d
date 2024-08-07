const assert = require('assert');
const app = require('../../src/app');

describe('\'appgentemp\' service', () => {
  it('registered the service', () => {
    const service = app.service('appgentemp');

    assert.ok(service, 'Registered the service (appgentemp)');
  });
});
