'use strict';

var _mongoose = require('../libs/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('../libs/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
** Initialize mongo and mongoose
*/

// Connection
_mongoose2.default.connect('mongodb://jmunoz:stationF@ds115729.mlab.com:15729/stationf');
_mongoose2.default.connection.on('connected', function () {
  return _logger2.default.info('Mongodb connected');
});
_mongoose2.default.connection.on('disconnected', function () {
  return _logger2.default.info('Mongodb disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  _mongoose2.default.connection.close(function () {
    _logger2.default.fatal('MongoDb disconnected through app termination');
    process.exit(1);
  });
});