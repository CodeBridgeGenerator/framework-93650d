const { Servicegen } = require('./servicegen.class');
const createModel = require('../../models/servicegen.model');
const hooks = require('./servicegen.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/servicegen', new Servicegen(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('servicegen');

  service.hooks(hooks);
};