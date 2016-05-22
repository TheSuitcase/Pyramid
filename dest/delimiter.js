"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Delimiter = {
  get: function get(delimiter, color) {
    return color(delimiter);
  }
};

exports.default = Delimiter;