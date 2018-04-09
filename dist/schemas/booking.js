'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('../libs/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var BookingSchema = new Schema({
  name: { type: String, default: 'Meeting' },
  user: { type: String, default: 'Anonymous' },
  description: String,
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  roomId: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
});

// BookingSchema.path('from').get((from) => {
//   if (typeof (from) === 'string') { return from; }
//   return from.toISOString();
// });

// BookingSchema.path('to').get((to) => {
//   if (typeof (to) === 'string') { return to; }
//   return to.toISOString();
// });

// BookingSchema.set('toObject', { getters: true });

exports.default = _mongoose2.default.model('Booking', BookingSchema, 'Bookings');