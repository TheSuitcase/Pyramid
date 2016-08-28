'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _readline = require('./readline');

var _readline2 = _interopRequireDefault(_readline);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _state = require('../state');

var _state2 = _interopRequireDefault(_state);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Setup.

var RenderEngine = (function (_EventEmitter) {
  _inherits(RenderEngine, _EventEmitter);

  function RenderEngine(queue) {
    _classCallCheck(this, RenderEngine);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RenderEngine).call(this));

    _this.queue = queue;
    _this.hasFinishedCycle = false;
    _this.listeners = {};
    _this.responses = [];

    // The currently active action.
    _this.action = undefined;

    _this.setupKeyboard();

    process.nextTick(function () {
      _this.render();
    });
    return _this;
  }

  /*
    Keyboard
   */

  _createClass(RenderEngine, [{
    key: 'setupKeyboard',
    value: function setupKeyboard() {
      this.listeners = {
        keyboardDidFireChar: this.keyboardDidFireChar.bind(this),
        keyboardDidFireEvent: this.keyboardDidFireEvent.bind(this)
      };

      // Fire up the keyboard.
      _keyboard2.default.on('char', this.listeners.keyboardDidFireChar.bind(this));
      _keyboard2.default.on('backspace', this.keyboardDidFireChar.bind(this));
      _keyboard2.default.on('event', this.keyboardDidFireEvent.bind(this));
    }
  }, {
    key: 'keyboardDidFireChar',
    value: function keyboardDidFireChar(char) {
      if (!this.action) {
        return;
      }
      if (!char) {
        char = -1;
      } // -1 means backspace!

      // Update the input
      if (char === -1) {
        this.action.input.pop();
      } else {
        this.action.input._data.push(char);
      }

      // Notify the currently active action.
      if (char && this.action.userInputDidUpdate) {
        this.action.userInputDidUpdate(char);
      }

      // Rerender action.
      this.render();
    }
  }, {
    key: 'keyboardDidFireEvent',
    value: function keyboardDidFireEvent(event) {
      if (!this.action) {
        return;
      }
      if (!event) {
        return;
      }

      // Notify the currently active action.
      if (this.action.keyboardDidFireEvent) {
        this.action.keyboardDidFireEvent(event);
      }

      // Rerender the action.
      this.render();
    }

    /*
      Action
     */

  }, {
    key: 'setAction',
    value: function setAction() {
      // Clear the current action.
      if (this.action) {
        this.clearAction();
      }

      // Goto the new action.
      if (this.queue.length === 0) {
        return;
      }

      var item = this.queue.splice(0, 1)[0];
      var _class = item.action;
      var args = item.args;

      // Create a new instance of the action.
      this.action = new _class();
      this.action.props = args;
      this.action.input = new _input2.default();

      if (!this.action.render) {
        this.setAction();
      }

      return this;
    }
  }, {
    key: 'clearAction',
    value: function clearAction() {
      if (!this.action) {
        return;
      }
      if (this.action && this.action.actionDidUnmount) {
        this.action.actionDidUnmount();
      }
      this.responses.push(this.action.response);

      delete this.action;
    }

    /*
      Render
     */

  }, {
    key: 'render',
    value: function render() {

      // Pre-render checks
      if (!this.action || !this.action.render) {
        this.setAction();
      }

      if (!this.action) {
        this.exit();
        return;
      }

      // Clear lastknow output.
      if (this.lastKnownOutput) {
        var lines = 0;

        if (_underscore2.default.isArray(this.lastKnownOutput)) {
          lines = this.lastKnownOutput.length + 1;
        }

        _screen2.default.clearLine(lines);
      }

      // Start rendering...
      var output = this.action.render();

      if (_underscore2.default.isString(output)) {
        output = [output];
      } else if (!_underscore2.default.isArray(output)) {
        output = [output.toString()];
      }

      // Store the current output for later.
      this.lastKnownOutput = output;

      // // Check if we should exit this action.
      var exit = false;
      if (!this.action.actionShouldExit) {
        exit = true;
      } else if (this.action.actionShouldExit() === true) {
        exit = true;
      }

      // // Exit if necessary.
      if (exit && this.exitOnFirstRender === undefined) {
        this.exitOnFirstRender = true;
      } else {
        this.exitOnFirstRender = false;
      }

      // // Prepend the delimiter to the output.
      output.forEach(function (line) {
        process.stdin.write(_state2.default.delimiter + line);
      });

      // out
      // process.stdin.write(output);
      // if(output.length === 1){
      process.stdin.write('\n');
      // }

      if (exit) {
        this.clearAction();
        this.render();
      }
    }
  }, {
    key: 'write',
    value: function write(output) {
      process.stdout.write(output);
    }
  }, {
    key: 'exit',
    value: function exit() {
      if (this.hasFinishedCycle) {
        return;
      }
      this.clearAction();
      this.hasFinishedCycle = true;

      this.emit('exit');
    }
  }]);

  return RenderEngine;
})(_events2.default);

exports.default = RenderEngine;