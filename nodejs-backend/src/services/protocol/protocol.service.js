const { Protocol } = require('./protocol.class');
const createModel = require('../../models/protocol.model');
const hooks = require('./protocol.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/protocol', new Protocol(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('protocol');

  service.hooks(hooks);
};