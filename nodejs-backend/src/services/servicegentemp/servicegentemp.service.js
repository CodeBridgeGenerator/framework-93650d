const { Servicegentemp } = require('./servicegentemp.class');
const createModel = require('../../models/servicegentemp.model');
const hooks = require('./servicegentemp.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/servicegentemp', new Servicegentemp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('servicegentemp');

  service.hooks(hooks);
};