const { Codechange } = require('./codechange.class');
const createModel = require('../../models/codechange.model');
const hooks = require('./codechange.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/codechange', new Codechange(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('codechange');

  service.hooks(hooks);
};