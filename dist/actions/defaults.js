'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = require('../state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = {
  write: function write(_ref) {
    var command = _ref.command;
    var pyramid = _ref.pyramid;
    var type = _ref.type;
    var args = _ref.args;
    var cb = _ref.cb;

    args = args.map(function (line) {
      return _state2.default.getDelimiter(type) + ' ' + line;
    });

    console.log(args.join('\n'));
    cb();
  },
  log: function log(api) {
    api.type = 'log';
    logger.write(api);
  },
  error: function error(api) {
    api.type = 'error';
    logger.write(api);
  },
  success: function success(api) {
    api.type = 'success';
    logger.write(api);
  },
  warning: function warning(api) {
    api.type = 'warning';
    logger.write(api);
  },
  linebreak: function linebreak(api) {
    // Create a linebreak without delimiter
    if (api.args[0] === false) {
      console.log('');
      api.cb();
      return;
    }

    // With delimiter
    api.args = [''];
    logger.write(api);
  }
};

exports.default = logger;