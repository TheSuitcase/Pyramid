'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _muteStream = require('mute-stream');

var _muteStream2 = _interopRequireDefault(_muteStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Default streams.
 */
var streams = {
  input: process.stdin,
  output: process.stdout
};

/*
  Make the output stream mutable.
 */
var ms = new _muteStream2.default();
ms.pipe(streams.output || process.stdout);
streams.output = ms;

/*
  The rl instance/interface
 */
var rl = _readline2.default.createInterface({
  terminal: true,
  input: streams.input,
  output: streams.output
});

exports.default = rl;