const assert = require('assert');
const app = require('../../src/app');

describe('\'servicegentemp\' service', () => {
  it('registered the service', () => {
    const service = app.service('servicegentemp');

    assert.ok(service, 'Registered the service (servicegentemp)');
  });
});
