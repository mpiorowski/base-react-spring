const { createProxyMiddleware } = require('http-proxy-middleware');
const apiproxy = process.env.APIPROXY || 'localhost';

module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {target: 'http://' + apiproxy + ':9000/'}));
};
