'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _typeof = require('../util/typeof');

var _typeof2 = _interopRequireDefault(_typeof);

var _queue = require('../util/queue');

var _queue2 = _interopRequireDefault(_queue);

var _state = require('../util/state');

var _state2 = _interopRequireDefault(_state);

var _syntax = require('./syntax');

var _syntax2 = _interopRequireDefault(_syntax);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _parameters = require('./parameters');

var _parameters2 = _interopRequireDefault(_parameters);

var _arguments = require('./arguments');

var _arguments2 = _interopRequireDefault(_arguments);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = (function () {
  function Command(command) {
    _classCallCheck(this, Command);

    this.name = command;

    this.state = {
      command: command,
      description: undefined,

      syntax: new _syntax2.default(this),
      help: new _help2.default(this),
      parameters: new _parameters2.default(this),
      arguments: new _arguments2.default(this),
      errors: new _errors2.default(),

      // Store the order of actions.
      actions: new _queue2.default(),

      callback: {
        validate: undefined,
        action: undefined,
        done: undefined
      }
    };

    // Actions.merge(this, this.state.actions)
    // Executer.bindActions(this, this.state.queue)

    return this;
  }

  _createClass(Command, [{
    key: 'required',
    value: function required() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.state.parameters.parse('required', args);
      return this;
    }
  }, {
    key: 'optional',
    value: function optional() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.state.parameters.parse('optional', args);
      return this;
    }
  }, {
    key: 'option',
    value: function option() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.state.parameters.parse('option', args);
      return this;
    }
  }, {
    key: 'parse',
    value: function parse(args) {
      this.state.arguments.generate();
      this.state.syntax.generate();
      this.state.help.generate();

      return this.state.arguments;
    }

    /*
     * State modifiers
     */

  }, {
    key: 'description',
    value: function description(_description) {
      if (!(0, _typeof2.default)(_description, 'string', 'undefined')) {
        return this;
      }
      this.state.description = _description;
      return this;
    }

    /*
     * Callbacks
     */

  }, {
    key: 'validate',
    value: function validate(cb) {
      this.state.callback.validate = cb;
      return this;
    }
  }, {
    key: 'action',
    value: function action(cb) {
      this.state.callback.action = cb;
      return this;
    }
  }, {
    key: 'done',
    value: function done(cb) {
      this.state.callback.done = cb;
      return this;
    }
  }]);

  return Command;
})();

exports.default = Command;