"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (regex, value) {
  return value.match(regex) === null ? false : true;
};