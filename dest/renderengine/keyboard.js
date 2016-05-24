'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keypress = require('keypress');

var _keypress2 = _interopRequireDefault(_keypress);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _state = require('../state');

var _state2 = _interopRequireDefault(_state);

var _readline = require('./readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = ['up', 'down', 'left', 'right', 'tab', 'return', 'backspace'];
var ee = new _eventemitter2.default();

var Keyboard = {
  emit: ee.emit.bind(ee),
  on: ee.on.bind(ee),

  listen: function listen() {
    (0, _keypress2.default)(process.stdin);
    _readline2.default.input.on('keypress', this.onKeyPress.bind(this));
  },
  onKeyPress: function onKeyPress(ch, key) {
    var input = _state2.default.input;

    // Close (ctrl + c).
    if (key && key.ctrl && key.name == 'c') {
      _screen2.default.exit();
    }

    var char = this.getCharacter(ch, key);

    if (events.indexOf(char) > -1) {
      this.emit(char);
      this.emit('event', char);
    } else {
      this.emit('char', char);
    }
    return false;
  },
  getCharacter: function getCharacter(ch, key) {
    if (key && key.name) {
      if (key.name === 'return' || key.name === 'backspace' || key.name === 'tab') {
        return key.name;
      }
    }
    if (ch) {
      return ch;
    }
    if (key && key.name) {
      return key.name;
    }
    return undefined;
  }
};

Keyboard.listen();

exports.default = Keyboard;