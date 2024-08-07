const { Changes } = require('./changes.class');
const createModel = require('../../models/changes.model');
const hooks = require('./changes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/changes', new Changes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('changes');

  service.hooks(hooks);
};