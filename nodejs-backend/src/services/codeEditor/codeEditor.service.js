const { CodeEditor } = require('./codeEditor.class');
const createModel = require('../../models/codeEditor.model');
const hooks = require('./codeEditor.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/codeEditor', new CodeEditor(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('codeEditor');

  service.hooks(hooks);
};