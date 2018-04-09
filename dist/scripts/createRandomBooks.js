'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = Promise;

function getRandomDay() {
  return Math.floor(Math.random() * 31 + 1);
}

function getRandomHours() {
  return 8 + Math.floor(Math.random() * 12 + 1);
}

function getRandomRoomId() {
  var roomIds = ['5aaeb428734d1d1b82890d8e', '5aaee8fc734d1d1b828917fd', '5aaee913734d1d1b82891802', '5aaee922734d1d1b8289180e', '5aaee934734d1d1b8289181b'];
  var index = Math.floor(Math.random() * 4);
  return roomIds[index];
}

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

  var _loop = function _loop(i) {
    var randomDay = getRandomDay();
    var randomHour = getRandomHours();
    var b = new Booking({
      name: 'Random Name',
      user: 'Random User',
      description: 'Random description',
      roomId: getRandomRoomId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      from: (0, _moment2.default)().month(2).date(randomDay).hours(randomHour).minutes(0).seconds(0).milliseconds(0),
      to: (0, _moment2.default)().month(2).date(randomDay).hours(randomHour + 2).minutes(0).seconds(0).milliseconds(0)
    });
    b.save().then(function (r) {
      return console.log('object saved:', b.inspect());
    }).catch(function (e) {
      return console.log(e);
    });
  };

  for (var i = 0; i < 10; i++) {
    _loop(i);
  }
});