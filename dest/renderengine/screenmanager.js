/*
  Disclaimer
  This file is heavily inspired by Inquirer.js
  
  Source: Inquirer.js
  File: screen-manager.js
  Url: https://github.com/SBoudrias/Inquirer.js/blob/66471210718ce92928ab5a6cc9a58fb70fc5d9d9/lib/utils/screen-manager.js
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _cliWidth = require('cli-width');

var _cliWidth2 = _interopRequireDefault(_cliWidth);

var _stripAnsi = require('strip-ansi');

var _stripAnsi2 = _interopRequireDefault(_stripAnsi);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

var _readline = require('./readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenManager = (function () {
  function ScreenManager() {
    _classCallCheck(this, ScreenManager);

    // These variables are keeping information to allow correct prompt re-rendering
    this.height = 0;
    this.extraLinesUnderPrompt = 0;
  }

  _createClass(ScreenManager, [{
    key: 'render',
    value: function render(content, bottomContent) {
      _readline2.default.output.unmute();
      this.clean(this.extraLinesUnderPrompt);

      /**
       * Write message to screen and setPrompt to control backspace
       */
      var promptLine = this.getLastLine(content);
      var rawPromptLine = (0, _stripAnsi2.default)(promptLine);

      // Remove the rl.line from our prompt. We can't rely on the content of
      // rl.line (mainly because of the password prompt), so just rely on it's
      // length.
      var prompt = promptLine;
      if (_readline2.default.line.length) {
        prompt = prompt.slice(0, -_readline2.default.line.length);
      }
      _readline2.default.setPrompt(prompt);

      // setPrompt will change cursor position, now we can get correct value
      var cursorPos = _readline2.default._getCursorPos();
      var width = this.normalizedCliWidth();

      content = this.forceLineReturn(content, width);
      if (bottomContent) {
        bottomContent = this.forceLineReturn(bottomContent, width);
      }
      // Manually insert an extra line if we're at the end of the line.
      // This prevent the cursor from appearing at the beginning of the
      // current line.
      if (rawPromptLine.length % width === 0) {
        content += '\n';
      }
      var fullContent = content + (bottomContent ? '\n' + bottomContent : '');
      _readline2.default.output.write(fullContent);

      /**
       * Re-adjust the cursor at the correct position.
       */

      // We need to consider parts of the prompt under the cursor as part of the bottom
      // content in order to correctly cleanup and re-render.
      var promptLineUpDiff = Math.floor(rawPromptLine.length / width) - cursorPos.rows;
      var bottomContentHeight = promptLineUpDiff + (bottomContent ? this.getHeight(bottomContent) : 0);
      if (bottomContentHeight > 0) {
        _screen2.default.up(bottomContentHeight);
      }

      // Reset cursor at the beginning of the line
      _screen2.default.left((0, _stringWidth2.default)(this.getLastLine(fullContent)));

      // Adjust cursor on the right
      _screen2.default.right(cursorPos.cols);

      /**
       * Set up state for next re-rendering
       */
      this.extraLinesUnderPrompt = bottomContentHeight;
      this.height = this.getHeight(fullContent);

      _readline2.default.output.mute();
    }
  }, {
    key: 'clean',
    value: function clean(extraLines) {
      if (extraLines > 0) {
        _screen2.default.down(extraLines);
      }
      _screen2.default.clearLine(this.height);
    }
  }, {
    key: 'done',
    value: function done() {
      _readline2.default.setPrompt('');
      _readline2.default.output.unmute();
      _readline2.default.output.write('\n');
    }
  }, {
    key: 'normalizedCliWidth',
    value: function normalizedCliWidth() {
      var width = (0, _cliWidth2.default)({
        defaultWidth: 80,
        output: _readline2.default.output
      });
      if (process.platform === 'win32') {
        return width - 1;
      }
      return width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight(content) {
      return content.split('\n').length;
    }
  }, {
    key: 'getLastLine',
    value: function getLastLine(content) {
      return _lodash2.default.last(content.split('\n'));
    }
  }, {
    key: 'breakLines',
    value: function breakLines(lines, width) {
      // Break lines who're longuer than the cli width so we can normalize the natural line
      // returns behavior accross terminals.
      var regex = new RegExp('(?:(?:\\033[[0-9;]*m)*.?){1,' + width + '}', 'g');
      return lines.map(function (line) {
        var chunk = line.match(regex);
        // last match is always empty
        chunk.pop();
        return chunk || '';
      });
    }
  }, {
    key: 'forceLineReturn',
    value: function forceLineReturn(content, width) {
      return _lodash2.default.flatten(this.breakLines(content.split('\n'), width)).join('\n');
    }
  }]);

  return ScreenManager;
})();

exports.default = ScreenManager;