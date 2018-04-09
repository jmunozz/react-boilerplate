'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roomIds = ['5aaeb428734d1d1b82890d8e', '5aaee8fc734d1d1b828917fd', '5aaee913734d1d1b82891802', '5aaee922734d1d1b8289180e', '5aaee934734d1d1b8289181b'];

_mongoose2.default.Promise = Promise;

// Connection
_mongoose2.default.connect('mongodb://jmunoz:stationF@ds115729.mlab.com:15729/stationf');
_mongoose2.default.connection.on('connected', function () {
  console.log('Mongodb connected');
  _mongoose2.default.connection.on('disconnected', function () {
    return console.log('Mongodb disconnected');
  });
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function () {
    _mongoose2.default.connection.close(function () {
      console.log('MongoDb disconnected through app termination');
      process.exit(1);
    });
  });

  var Schema = _mongoose2.default.Schema;

  var Booking = _mongoose2.default.model('Booking', new Schema({
    name: String,
    user: String,
    description: String,
    from: Date,
    to: Date,
    roomId: String,
    createdAt: Date,
    updatedAt: Date
  }), 'Bookings');

  return Booking.find({
    $or: [{
      from: {
        $gte: (0, _moment2.default)(),
        $lte: (0, _moment2.default)('2018-03-19T12:59:59.000Z')
      }
    }, {
      to: {
        $gte: (0, _moment2.default)(),
        $lte: (0, _moment2.default)('2018-03-19T13:00:00.000Z')
      }
    }]
  }).then(function (bookings) {
    console.log(bookings);
  });
});