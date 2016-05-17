'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

var _executer = require('./executer');

var _executer2 = _interopRequireDefault(_executer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Command = (function (_EventEmitter) {
  _inherits(Command, _EventEmitter);

  function Command(command) {
    var _ret;

    _classCallCheck(this, Command);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Command).call(this));

    _this.state = {
      command: command,
      required: {},
      optional: {},
      options: {},
      subcommands: {},
      autocomplete: false,

      // Store the order of ui requested elements.
      queue: new _queue2.default()
    };

    _executer2.default.bindActions(_this, _this.state.queue);

    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Command, [{
    key: 'parse',
    value: function parse(args) {
      var required = {},
          optional = [],
          options = [];

      if (this.state.required) {
        required = args.splice(0, 1);
      }

      args.forEach(function (arg) {
        var match = arg.match(/\-\-?([\w0-9]+)/g) ? true : false;
        if (match) {
          options.push(arg);
        } else {
          optional.push(arg);
        }
      });

      _executer2.default.start(this);
    }
  }, {
    key: 'required',
    value: function required(command, description) {
      if (_util2.default.isString(command)) {
        command = _defineProperty({}, command, description);
      }

      Object.assign(this.state.required, command);
      return this;
    }
  }, {
    key: 'optional',
    value: function optional(command, description) {
      if (_util2.default.isString(command)) {
        command = _defineProperty({}, command, description);
      }

      Object.assign(this.state.optional, command);
      return this;
    }
  }, {
    key: 'option',
    value: function option(command, description) {
      if (_util2.default.isString(command)) {
        command = _defineProperty({}, command, description);
      }

      Object.assign(this.state.options, command);
      return this;
    }
  }, {
    key: 'subcommand',
    value: function subcommand() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_util2.default.isArray(args[0])) {
        args = args[0];
      }

      var commands = {};
      args.forEach(function (command) {
        commands[command.state.command] = command;
      });

      Object.assign(this.state.subcommands, commands);
      return this;
    }
  }, {
    key: 'autocomplete',
    value: function autocomplete() {
      var bool = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      this.state.autocomplete = bool;
      return this;
    }

    // Syntactic sugar

  }, {
    key: 'ui',
    value: function ui(cb) {
      this.on('ui', cb);
      return this;
    }
  }, {
    key: 'action',
    value: function action(cb) {
      this.on('action', cb);
      return this;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.state.queue.clear();
      return this;
    }
  }]);

  return Command;
})(_eventemitter2.default);

exports.default = Command;

/*

  _runFeature (feature, cb) {
    // inquirer
    //   .prompt([feature])
    //   .then((answers) => {
    //     let keys = Object.keys(answers)
    //     let answer = answers[keys[0]]

    //     if (this.state.events.action) {
    //       this.state.events.action(this, feature, answer)
    //     }
    //     cb()
    //   })
  }
 */