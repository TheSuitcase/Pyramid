'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _command2 = require('./command');

var _command3 = _interopRequireDefault(_command2);

var _actioncenter = require('./actioncenter');

var _actioncenter2 = _interopRequireDefault(_actioncenter);

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ee = new _eventemitter2.default();

var Pyramid = {
  on: ee.on.bind(ee),

  /**
  * Set the debug mode. Disabled by default.
  * @param  {Boolean} bool - True = enabled, false = disabled
  * @default true
  */
  debug: function debug() {
    var bool = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    if (!_underscore2.default.isBoolean(bool)) {
      _debug2.default.error('[pyramid.debug] The argument should be a boolean!');
      return this;
    }

    _state2.default.debugging = bool;
    return this;
  },

  /**
   * Set the version for the cli.
   * @param  {String} version - The version number.
   */
  version: function version() {
    var _version = arguments.length <= 0 || arguments[0] === undefined ? '0.0.0' : arguments[0];

    if (!_underscore2.default.isString(_version)) {
      _debug2.default.error('[pyramid.version] The version should be a string!');
      return this;
    }

    _state2.default.version = _version;
    return this;
  },

  /**
   * Set the delimiter.
   * @param  {String} delimiter - The delimiter.
   */
  delimiter: function delimiter(_delimiter) {
    if (!_underscore2.default.isString(_delimiter)) {
      _debug2.default.error('[pyramid.delmiter] The delmiter must be a string!');
      return this;
    }

    // Append a space.
    if (_delimiter[_delimiter.length - 1] != ' ') {
      _delimiter += ' ';
    }

    _state2.default.delimiter = _delimiter;
    return this;
  },

  /**
   * Create a new command.
   * @param  {String} command - The command.
   * @return {Command}         
   */
  command: function command(_command) {
    if (!_underscore2.default.isString(_command)) {
      _debug2.default.error('[pyramid.command] The command must be a string!');
      return this;
    }

    // Create and set.
    var _c = new _command3.default(_command);
    _state2.default.commands[_command] = _c;
    return _c;
  }
};

_actioncenter2.default.merge(Pyramid, _queue2.default);

exports.default = Pyramid;

module.exports = Pyramid;