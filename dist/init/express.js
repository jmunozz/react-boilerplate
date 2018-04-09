'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _logRequests = require('../middlewares/logRequests');

var _logRequests2 = _interopRequireDefault(_logRequests);

var _logger = require('../libs/logger');

var _logger2 = _interopRequireDefault(_logger);

var _api = require('../routers/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var PUBLIC = _path2.default.resolve('./public');

/**
 * In developement front-app must be delivered by webpack server middlewre. In prod, by a public folder.
 */
if (process.env.NODE_ENV === 'development') {
  var compiler = (0, _webpack2.default)(require('../../../webpack.dev'));
  app.use((0, _webpackDevMiddleware2.default)(compiler));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
} else {
  app.use(_express2.default.static(PUBLIC));
}

/**
 * Middlewares
 */
app.use(_logRequests2.default);

/**
 * Api Routes
 */
app.use('/api', _api2.default);

/**
 * Front-end app delivering.
 */
app.get('*', function (req, res) {
  res.sendFile(_path2.default.join(PUBLIC, 'index.html'));
});

app.listen(8080, function () {
  return _logger2.default.info('Example app listening on port 8080!');
});