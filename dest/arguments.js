'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _pyramid = require('./pyramid');

var _pyramid2 = _interopRequireDefault(_pyramid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arguments = (function (_EventEmitter) {
  _inherits(Arguments, _EventEmitter);

  function Arguments() {
    var args = arguments.length <= 0 || arguments[0] === undefined ? process.argv.slice(2) : arguments[0];

    _classCallCheck(this, Arguments);

    // Used variables.

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Arguments).call(this));

    _this.command = undefined; // Command Object...

    _this.originalArguments = args;
    _this.processedArguments = [];

    // End result.
    _this.arguments = {};
    _this.options = {};
    return _this;
  }

  _createClass(Arguments, [{
    key: 'parse',
    value: function parse() {
      // Prepare the incomming data.
      this.prepare(this.originalArguments);

      // Run some checks.
      var checks = [this.isNotEmpty, this.commandIsRecognized, this.setCommand, this.requirementsAreFulFilled, this.parseArguments, this.parseOptions];

      var i = 0,
          len = checks.length,
          check = undefined,
          passedAllChecks = true;

      for (i; i < len; i++) {
        check = checks[i];

        var result = check.apply(this);
        if (!result) {
          passedAllChecks = false;
          break;
        }
      }

      return passedAllChecks;
    }
  }, {
    key: 'prepare',
    value: function prepare(args) {
      var result = (0, _minimist2.default)(args);
      this.processedArguments = result._;

      delete result._;
      this.options = result;

      return this;
    }
  }, {
    key: 'setCommand',
    value: function setCommand() {
      this.command = _state2.default.commands[this.processedArguments[0]];

      // Abstract the command.
      this.processedArguments.splice(0, 1)[0];
      return this.command ? true : false;
    }

    /*
      Checks...
     */

  }, {
    key: 'isNotEmpty',
    value: function isNotEmpty() {
      var valid = this.processedArguments.length === 0 ? false : true;

      if (!valid) {
        _pyramid2.default.error('Please enter a command');
      }

      return valid;
    }
  }, {
    key: 'commandIsRecognized',
    value: function commandIsRecognized() {
      var recognized = _state2.default.commands[this.processedArguments[0]] ? true : false;

      if (!recognized) {
        _pyramid2.default.error('The command is not available!');
      }

      return recognized;
    }
  }, {
    key: 'requirementsAreFulFilled',
    value: function requirementsAreFulFilled() {
      if (!this.command) {
        return false;
      }
      var shouldHave = Object.keys(this.command.state.required).length;

      // Count in the command itself.
      if (this.processedArguments.length < shouldHave) {
        _pyramid2.default.log('Please enter all the required parameters!');
        return false;
      }

      return true;
    }

    /*
      Parse...
     */

  }, {
    key: 'parseArguments',
    value: function parseArguments() {
      // Process the leftovers.
      var results = {};

      var commandKeys = [];
      commandKeys = commandKeys.concat(Object.keys(this.command.state.required));
      commandKeys = commandKeys.concat(Object.keys(this.command.state.optional));

      var i = 0,
          len = commandKeys.length,
          key = undefined;

      for (i; i < len; i++) {
        key = commandKeys[i];
        results[key] = this.processedArguments[i];
      }

      this.arguments = results;

      return true;
    }

    /**
     * Delete unwanted options...
     * @return {[type]} [description]
     */

  }, {
    key: 'parseOptions',
    value: function parseOptions() {
      var commandOptions = Object.keys(this.command.state.options);
      var foundOptions = Object.keys(this.options);

      var i = 0,
          len = foundOptions.length,
          key = undefined;

      for (i; i < len; i++) {
        key = foundOptions[i];
        if (commandOptions.indexOf(key) === -1) {
          delete this.options[key];
        }
      }

      return true;
    }
  }]);

  return Arguments;
})(_eventemitter2.default);

exports.default = Arguments;