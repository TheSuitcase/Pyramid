'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Command = (function () {
  function Command(command) {
    _classCallCheck(this, Command);

    this.name = command;

    this.state = new _state2.default({
      command: command,
      description: undefined,
      docs: undefined,
      example: undefined,

      syntax: new _syntax2.default(this),
      help: new _help2.default(this),
      parameters: new _parameters2.default(this),
      arguments: new _arguments2.default(this),

      // Store the order of actions.
      actions: new _queue2.default(),

      callbacks: {
        validate: undefined,
        action: undefined,
        exit: undefined
      }
    });

    _actions2.default.merge(this, this.state.actions);

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
      this.state.arguments.generate(args);
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
      this.state.set({ description: _description });
      return this;
    }
  }, {
    key: 'docs',
    value: function docs(_docs) {
      if (!(0, _typeof2.default)(_docs, 'string')) {
        return this;
      }
      this.state.set({ docs: _docs });
      return this;
    }
  }, {
    key: 'example',
    value: function example(_example) {
      if (!(0, _typeof2.default)(_example, 'string')) {
        return this;
      }
      this.state.set({ example: _example });
      return this;
    }

    /*
     * Callbacks
     */

  }, {
    key: 'validate',
    value: function validate(cb) {
      if (!(0, _typeof2.default)(cb, 'function')) {
        return this;
      }
      this.state.set({
        callbacks: {
          validate: cb
        }
      });
      return this;
    }
  }, {
    key: 'action',
    value: function action(cb) {
      if (!(0, _typeof2.default)(cb, 'function')) {
        return this;
      }
      this.state.set({
        callbacks: {
          action: cb
        }
      });
      return this;
    }
  }, {
    key: 'exit',
    value: function exit(cb) {
      if (!(0, _typeof2.default)(cb, 'function')) {
        return this;
      }
      this.state.set({
        callbacks: {
          exit: cb
        }
      });
      return this;
    }
  }]);

  return Command;
})();

exports.default = Command;