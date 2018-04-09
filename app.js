'use strict';

try {
  require('../server/init/mongo');
  require('../server/init/express');
} catch (e) {}
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

var _webpack3 = require('../../../webpack.dev');

var _webpack4 = _interopRequireDefault(_webpack3);

var _middlewares = require('../middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _logger = require('../libs/logger');

var _logger2 = _interopRequireDefault(_logger);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PUBLIC = _path2.default.resolve('../../../public');

/**
 * In developement front-app must be delivered by webpack server middlewre. In prod, by a public folder.
 */
if (process.env.NODE_ENV === 'development') {
  var compiler = (0, _webpack2.default)(_webpack4.default);
  app.use((0, _webpackDevMiddleware2.default)(compiler));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
} else {
  app.use(_express2.default.static('public'));
}

/**
 * Middlewares
 */
app.use(_middlewares2.default.logRequests);

/**
 * Api Routes
 */
app.use('/api', _routes2.default);

/**
 * Front-end app delivering.
 */
app.get('/*', function (req, res) {
  return res.sendFile(_path2.default.join(PUBLIC, 'index.html'));
});

app.listen(3000, function () {
  return _logger2.default.info('Example app listening on port 3000!');
});
'use strict';

var _mongoose = require('../libs/mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _logger = require('../libs/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as schemas from '../schemas';


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

// Models
// Object.keys(schemas).forEach((key) => {
//   const schema = mongoose.Schema(schemas[key]);
//   mongoose.model(key, schema);
// });
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = _logger2.default.createLogger();

exports.default = log;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = _bluebird2.default;

exports.default = _mongoose2.default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResponse = sendResponse;
exports.sendError = sendError;
function sendResponse(res, data) {
  return res.json({
    code: 200,
    data: data
  });
}

function sendError(res, error) {
  return res.json({
    code: 500,
    name: error.name,
    message: error.message
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logRequests = require('./logRequests');

var _logRequests2 = _interopRequireDefault(_logRequests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  logRequests: _logRequests2.default
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../libs/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logRequests = function logRequests(req, res, next) {
  _logger2.default.info(req.method, req.originalUrl);
  next();
};

exports.default = logRequests;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _rooms = require('./rooms');

var rooms = _interopRequireWildcard(_rooms);

var _logger = require('../libs/logger');

var _logger2 = _interopRequireDefault(_logger);

var _responses = require('../libs/responses');

var responses = _interopRequireWildcard(_responses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create router
var router = _express2.default.Router();

/*
** Rooms
*/

// Print requests to API
router.use(function (req, res, next) {
  _logger2.default.info('router', req.method, req.originalUrl);
  next();
});

// Routes
router.get('/rooms', rooms.getAll);

// Errors
router.use(function (error, req, res, next) {
  if (res.headersSent) return next(error);
  _logger2.default.error('Handled: ' + error.name, error);
  return responses.sendError(res, error);
});

exports.default = router;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = undefined;

var getAll = exports.getAll = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var all;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _logger2.default.info('infos');
            _context.prev = 1;
            _context.next = 4;
            return _room2.default.findOne({ name: 'Salle #1' });

          case 4:
            all = _context.sent;

            response.sendResponse(res, all);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);

            _logger2.default.info(_context.t0);
            next(_context.t0);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 8]]);
  }));

  return function getAll(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _responses = require('../libs/responses');

var response = _interopRequireWildcard(_responses);

var _room = require('../schemas/room');

var _room2 = _interopRequireDefault(_room);

var _logger = require('../libs/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = getAll;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Room: _room2.default
};
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
}));
