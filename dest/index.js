'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pyramid = require('./pyramid');

var _pyramid2 = _interopRequireDefault(_pyramid);

var _runtime = require('./runtime');

var _runtime2 = _interopRequireDefault(_runtime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Parse.
_pyramid2.default.parse = function () {
  _runtime2.default.start();
};

exports.default = _pyramid2.default;