const { Environments } = require('./environments.class');
const createModel = require('../../models/environments.model');
const hooks = require('./environments.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/environments', new Environments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('environments');

  service.hooks(hooks);
};