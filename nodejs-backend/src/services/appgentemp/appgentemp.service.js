const { Appgentemp } = require('./appgentemp.class');
const createModel = require('../../models/appgentemp.model');
const hooks = require('./appgentemp.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/appgentemp', new Appgentemp(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('appgentemp');

  service.hooks(hooks);
};