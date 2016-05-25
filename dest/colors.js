'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cliColor = require('cli-color');

var _cliColor2 = _interopRequireDefault(_cliColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// See https://github.com/medikoo/cli-color
// for more colors.

var Colors = {
  red: _cliColor2.default.xterm(9),
  yellow: _cliColor2.default.xterm(228),
  orange: _cliColor2.default.xterm(214),
  blue: _cliColor2.default.xterm(75),
  purple: _cliColor2.default.xterm(177),
  green: _cliColor2.default.xterm(79),
  cyan: _cliColor2.default.xterm(80),
  blur: _cliColor2.default.xterm(59)
};

exports.default = Colors;