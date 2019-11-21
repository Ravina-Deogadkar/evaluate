const assert = require('assert');
const app = require('../../src/app');

describe('\'evaluate\' service', () => {
  it('registered the service', () => {
    const service = app.service('evaluate');

    assert.ok(service, 'Registered the service');
  });
});
