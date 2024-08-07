const { Codechanges } = require('./codechanges.class');
const createModel = require('../../models/codechanges.model');
const hooks = require('./codechanges.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/codechanges', new Codechanges(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('codechanges');

  service.hooks(hooks);
};