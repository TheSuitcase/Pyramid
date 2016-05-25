'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ansiEscapes = require('ansi-escapes');

var _ansiEscapes2 = _interopRequireDefault(_ansiEscapes);

var _readline = require('./readline');

var _readline2 = _interopRequireDefault(_readline);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _state = require('../state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Disclaimer
  This file is heavily inspired by Inquirer.js

  Source: Inquirer.js
  File: readline.js
  Url: https://github.com/SBoudrias/Inquirer.js/blob/66471210718ce92928ab5a6cc9a58fb70fc5d9d9/lib/utils/readline.js
 */

var Screen = {
  /**
   * Move cursor left by `x`
   * @param  {Readline} rl - Readline instance
   * @param  {Number}   x  - How far to go left (default to 1)
   */

  left: function left(x) {
    _readline2.default.output.write(_ansiEscapes2.default.cursorBackward(x));
  },

  /**
   * Move cursor right by `x`
   * @param  {Readline} rl - Readline instance
   * @param  {Number}   x  - How far to go left (default to 1)
   */
  right: function right(x) {
    _readline2.default.output.write(_ansiEscapes2.default.cursorForward(x));
  },

  /**
   * Move cursor up by `x`
   * @param  {Readline} rl - Readline instance
   * @param  {Number}   x  - How far to go up (default to 1)
   */

  up: function up(x) {
    _readline2.default.output.write(_ansiEscapes2.default.cursorUp(x));
  },

  /**
   * Move cursor down by `x`
   * @param  {Readline} rl - Readline instance
   * @param  {Number}   x  - How far to go down (default to 1)
   */

  down: function down(x) {
    _readline2.default.output.write(_ansiEscapes2.default.cursorDown(x));
  },

  /**
   * Clear current line
   * @param  {Readline} rl  - Readline instance
   * @param  {Number}   len - number of line to delete
   */
  clearLine: function clearLine(len) {
    _readline2.default.output.write(_ansiEscapes2.default.eraseLines(len));
  },
  start: function start() {
    _readline2.default.input.setRawMode(true);
    _readline2.default.input.resume();
  },
  exit: function exit() {
    var extraline = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    // Note: Readline.output does not work
    // therefore we use process.stdout
    if (_index2.default.lastRenderWasWithScreenManager) {
      process.stdout.write('\n');
    }

    if (_state2.default.callbacks.exit) {
      _state2.default.callbacks.exit();
    }

    process.exit();
  }
};

Screen.start();

exports.default = Screen;