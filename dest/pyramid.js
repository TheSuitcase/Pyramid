'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _action = require('./actions/action');

var _action2 = _interopRequireDefault(_action);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _typeof = require('./util/typeof');

var _typeof2 = _interopRequireDefault(_typeof);

var _command2 = require('./command');

var _command3 = _interopRequireDefault(_command2);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pyramid = {
  Action: _action2.default, State: _state2.default,

  version: (function (_version) {
    function version() {
      return _version.apply(this, arguments);
    }

    version.toString = function () {
      return _version.toString();
    };

    return version;
  })(function () {
    var version = arguments.length <= 0 || arguments[0] === undefined ? '0.0.0' : arguments[0];

    if (!(0, _typeof2.default)(version, 'string')) {
      return this;
    }
    _state2.default.set({ version: version });
    return this;
  }),
  welcome: function welcome(message) {
    if (!(0, _typeof2.default)(version, 'string', 'array', 'undefined')) {
      return this;
    }
    _state2.default.set({ welcome: message });
    return this;
  },
  goodby: function goodby(message) {
    if (!(0, _typeof2.default)(version, 'string', 'array', 'undefined')) {
      return this;
    }
    _state2.default.set({ goodby: message });
    return this;
  },
  color: function color(colors) {
    if (!(0, _typeof2.default)(colors, 'object')) {
      return this;
    }
    _state2.default.set({ colors: colors });
    return this;
  },
  delimiter: function delimiter(_delimiter) {
    if ((0, _typeof2.default)(_delimiter, 'string')) {
      _state2.default.set({ delimiter: {
          default: _delimiter
        } });
      return this;
    }

    if (!(0, _typeof2.default)(_delimiter, 'object')) {
      return this;
    }

    _state2.default.set({ delimiter: _delimiter });
    return this;
  },
  command: function command(_command) {
    if (!(0, _typeof2.default)(_command, 'string')) {
      return;
    }
    return _state2.default.commands[_command] = new _command3.default(_command);
  },
  parse: function parse() {
    var args = arguments.length <= 0 || arguments[0] === undefined ? process.argv : arguments[0];

    if (!(0, _typeof2.default)(args, 'array')) {
      // TODO: show error!
      return;
    }

    if (args === process.argv) {
      args = args.slice(2, args.length);
    }

    // Find a matching command
    if (args.length === 0) {
      _state2.default.actions.add(_actions2.default.actions.log, 'Please enter a command!');
    } else if (args.length > 40) {
      _state2.default.actions.add(_actions2.default.actions.log, 'you command contain out of to many space seperated characters/words');
    }

    _state2.default.actions.add(_actions2.default.actions.checkbox, 'item 1', 'item 2', 'item 3');
    _state2.default.actions.add(_actions2.default.actions.log, 'Next!');

    _state2.default.actions.add(_actions2.default.actions.confirm);
    _state2.default.actions.add(_actions2.default.actions.log, 'Bye!');

    _actions2.default.execute();
  }
};

_actions2.default.merge(Pyramid, _state2.default.actions);

exports.default = Pyramid;