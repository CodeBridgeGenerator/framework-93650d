const { Secondframework } = require('./secondframework.class');
const createModel = require('../../models/secondframework.model');
const hooks = require('./secondframework.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/secondframework', new Secondframework(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('secondframework');

  service.hooks(hooks);
};