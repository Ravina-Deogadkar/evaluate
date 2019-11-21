const evaluate = require('./evaluate/evaluate.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(evaluate);
};
