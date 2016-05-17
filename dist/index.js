'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

var _executer = require('./executer');

var _executer2 = _interopRequireDefault(_executer);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ee = new _events2.default();

var Pyramid = {
  emit: ee.emit.bind(ee),
  on: ee.on.bind(ee),

  version: function version(_version) {
    _state2.default.version = _version;
    return this;
  },
  directory: function directory() {
    for (var _len = arguments.length, paths = Array(_len), _key = 0; _key < _len; _key++) {
      paths[_key] = arguments[_key];
    }

    if (_util2.default.isArray(paths[0])) {
      paths = paths[0];
    }
    _state2.default.directories = _state2.default.directories.concat(paths);
    return this;
  },

  // Set the delimiter.
  delimiter: function delimiter(_delimiter) {
    if (_util2.default.isString(_delimiter)) {
      _state2.default.delimiter.default = _delimiter;
      return this;
    }

    // TODO: Log error
    if (!_util2.default.isObject(_delimiter)) {
      return this;
    }

    var keys = Object.keys(_delimiter);
    var item = undefined;

    keys.forEach(function (key) {
      item = _delimiter[key];

      // Convert to object.
      if (_util2.default.isString(item)) {
        item = { delimiter: item };
      }

      if (item.color) {
        _state2.default.color[key] = item.color;
      }
      if (item.delimiter) {
        _state2.default.delimiter[key] = item.delimiter;
      }
    });
    return this;
  },
  color: function color(_color) {
    if (_util2.default.isString(_color)) {
      _color = { default: _color };
    }

    if (!_util2.default.isObject(_color)) {
      return;
    }

    Object.assign(_state2.default.color, _color);
    return this;
  },
  welcome: function welcome() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _state2.default.welcome = args.join('\n');
    return this;
  },
  goodby: function goodby() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _state2.default.goodby = args.join('\n');
    return this;
  },
  overflow: function overflow(cb) {
    _state2.default.callbacks.overflow = cb;
    return this;
  },
  autocomplete: function autocomplete() {
    var bool = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    _state2.default.autocomplete = bool;
  },
  command: function command(string) {
    var command = new _command2.default(string);
    _state2.default.commands[command.state.command] = command;
    return command;
  },
  parse: function parse() {
    var args = arguments.length <= 0 || arguments[0] === undefined ? process.argv : arguments[0];

    args.splice(0, 2);

    var command = args[0];

    if (_state2.default.commands[command]) {
      args.splice(0, 1);
      _state2.default.commands[command].parse(args);
      return this;
    }

    // Give the user the posibility to process the missing request.
    if (_state2.default.callbacks.overflow) {
      _state2.default.callbacks.overflow(args);
      return this;
    }

    this.clear();

    // Default for handling missing commands.
    if (command) {
      this.log('The command \'' + command + '\' is not available!');
    } else {
      this.log('Please enter a command or for help type --help');
    }

    // Flush the queue.
    _executer2.default.start();

    return this;
  },
  clear: function clear() {
    _state2.default.queue.clear();
    return this;
  }
};

// Add the actions.
_executer2.default.bindActions(Pyramid, _state2.default.queue);

exports.default = Pyramid;

module.exports = Pyramid;