// Initializes the `evaluate` service on path `/evaluate`
const { Evaluate } = require('./evaluate.class');
const hooks = require('./evaluate.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/evaluate', new Evaluate(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('evaluate');

  service.hooks(hooks);
};
