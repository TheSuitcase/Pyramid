'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/*
  Quickly check if a variable is 
  a certain type.

  The value MUST at least match one type!
  otherwise it will return false

  Input: value, typeA, typeB, ....
  Output: true / false

 */
var index = {
  string: '[object String]',
  array: '[object Array]',
  object: '[object Object]',
  regexp: '[object RegExp]',
  boolean: '[object Boolean]'
};

var typeIndex = {
  '[object String]': 'string',
  '[object Array]': 'array',
  '[object Object]': 'object',
  '[object RegExp]': 'regexp',
  '[object Boolean]': 'boolean'
};

var TypeOf = function TypeOf(value) {
  if (arguments.length - 1 === 0) {
    return typeIndex[Object.prototype.toString.apply(value)] || undefined;
  }

  var i = 0,
      len = arguments.length - 1;
  var type = undefined;

  var matches = 0;

  for (i; i < len; i++) {
    type = arguments.length <= i + 1 ? undefined : arguments[i + 1];

    switch (type) {
      case 'undefined':
        if (value === undefined) {
          matches++;
        }
        break;
      case 'string':
      case 'number':
      case 'boolean':
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type) {
          matches++;
        }
        break;

      case 'regexp':
      case 'object':
      case 'array':
        if (!index[type]) {
          continue;
        }
        if (Object.prototype.toString.apply(value) === index[type]) {
          matches++;
        }
        break;
    }
  }

  if (matches > 0) {
    return true;
  }

  return false;
};

exports.default = TypeOf;