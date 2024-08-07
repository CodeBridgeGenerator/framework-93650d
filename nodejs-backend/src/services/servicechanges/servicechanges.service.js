const { Servicechanges } = require('./servicechanges.class');
const createModel = require('../../models/servicechanges.model');
const hooks = require('./servicechanges.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/servicechanges', new Servicechanges(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('servicechanges');

  service.hooks(hooks);
};