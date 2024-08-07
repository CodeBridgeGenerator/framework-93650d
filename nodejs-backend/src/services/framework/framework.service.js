const { Framework } = require('./framework.class');
const createModel = require('../../models/framework.model');
const hooks = require('./framework.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/framework', new Framework(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('framework');

  service.hooks(hooks);
};