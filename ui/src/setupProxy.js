const proxy = require('http-proxy-middleware');
const apiproxy = process.env.APIPROXY || 'localhost';

module.exports = function (app) {
  app.use(proxy('/api', {target: 'http://' + apiproxy + ':9000/'}));
};
