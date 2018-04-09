'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _rooms = require('./rooms');

var rooms = _interopRequireWildcard(_rooms);

var _errors = require('../middlewares/errors');

var _errors2 = _interopRequireDefault(_errors);

var _logRequests = require('../middlewares/logRequests');

var _logRequests2 = _interopRequireDefault(_logRequests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create router
var router = _express2.default.Router();

/*
** Rooms
*/

// Middlewares
router.use(_logRequests2.default);
router.use(_bodyParser2.default.json());

// Routes
router.get('/rooms/:id', rooms.getBooking);
router.post('/rooms/:id', rooms.postBooking);
router.get('/rooms', rooms.getAll);

// Errors
router.use(_errors2.default);

exports.default = router;