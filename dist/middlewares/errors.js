'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (err, req, res, next) {
  _logger2.default.error(err.stack);
  (0, _responses.sendError)(res, err);
};

var _responses = require('../libs/responses');

var _logger = require('../libs/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }