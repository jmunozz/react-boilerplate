'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getAll = getAll;
exports.getBooking = getBooking;
exports.postBooking = postBooking;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _responses = require('../libs/responses');

var response = _interopRequireWildcard(_responses);

var _room = require('../schemas/room');

var _room2 = _interopRequireDefault(_room);

var _booking = require('../schemas/booking');

var _booking2 = _interopRequireDefault(_booking);

var _logger = require('../libs/logger');

var _logger2 = _interopRequireDefault(_logger);

var _validationError = require('../classes/validationError');

var _validationError2 = _interopRequireDefault(_validationError);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAll(req, res, next) {
  return _room2.default.find().then(function (rooms) {
    var _req$query = req.query,
        equipements = _req$query.equipements,
        capacity = _req$query.capacity;

    // Filter by capacity.

    var results = rooms.filter(function (room) {
      if (capacity) return room.capacity >= capacity;
      return true;
    });

    // Filter by equipement.
    results = results.filter(function (room) {
      if (equipements) {
        var hasAll = true;
        equipements.split(',').forEach(function (equFilter) {
          if (!room.equipements.find(function (equ) {
            return equ.name === equFilter;
          })) {
            hasAll = false;
          }
        });
        return hasAll;
      }
      return true;
    });

    _logger2.default.info(results);
    response.sendResponse(res, results);
  }).catch(function (e) {
    _logger2.default.info(e);
    next(e);
  });
}

function getBooking(req, res, next) {
  var id = req.params.id;

  return _booking2.default.find({ roomId: id }).then(function (bookings) {
    response.sendResponse(res, bookings);
  }).catch(function (e) {
    next(e);
  });
}

function postBooking(req, res, next) {
  var id = req.params.id;

  var booking = new _booking2.default(_extends({}, req.body, { roomId: id }));

  return booking.validate()
  // Check validation rules are ok.
  .then(function () {
    return _room2.default.find();
  })
  // Check room id is valid.
  .then(function (rooms) {
    var roomsIds = rooms.map(function (room) {
      return room.id;
    });
    if (!roomsIds.includes(id)) {
      throw new _validationError2.default('room id does not exist');
    }

    booking.set('from', (0, _moment2.default)(booking.get('from')));
    booking.set('to', (0, _moment2.default)(booking.get('to')).subtract(1, 'seconds'));

    return _booking2.default.find({
      $or: [{
        from: {
          $gte: booking.get('from'),
          $lte: booking.get('to')
        }
      }, {
        to: {
          $gte: booking.get('from'),
          $lte: booking.get('to')
        }
      }]
    });
  })
  // Check Booking is possible.
  .then(function (registeredBookings) {
    if (registeredBookings.length) {
      throw new _validationError2.default('This slot is at least already partially booked');
    }
    if ((0, _moment2.default)(booking.get('to')).diff(booking.get('from'), 'minutes') > 120) {
      throw new _validationError2.default('Slot cannot exceed two hours');
    }
    if ((0, _moment2.default)(booking.get('from')).isBefore((0, _moment2.default)())) {
      throw new _validationError2.default('Passed slots cannot be booked');
    }
    return booking.save();
  }).then(function () {
    response.sendResponse(res, booking.toObject());
  }).catch(function (e) {
    next(e);
  });
}