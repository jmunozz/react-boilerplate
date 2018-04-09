'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('../libs/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
exports.default = _mongoose2.default.model('Room', new Schema({
  name: String,
  description: String,
  capacity: Number,
  equipements: [{
    name: String
  }],
  createdAt: Date,
  updatedAt: Date
}), 'Rooms');