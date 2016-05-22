'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parser = {
  parse: function parse(_ref) {
    var required = _ref.required;
    var optional = _ref.optional;
    var options = _ref.options;
    var args = _ref.args;

    var result = {
      errors: []
    };

    var settings = { required: required, optional: optional, options: options };

    // console.log(settings)

    // Abstract the required arguments
    this.collectRequiredArguments(settings, args, result, result.errors);

    // Abstract the optional arguments
    this.collectOptionalArguments(settings, args, result, result.errors);

    // Abstract the options
    this.collectionOptions(settings, args, result, result.errors);

    return result;
  },
  collectRequiredArguments: function collectRequiredArguments(settings, args, result, errors) {
    if (!result.required) {
      result.required = {};
    }

    var keys = Object.keys(settings.required);
    var len = keys.length;

    if (len === 0) {
      return;
    }

    if (len > args.length) {
      errors.push('Please enter all the required arguments!');
      return;
    }

    var arg = undefined;
    for (var i = 0; i < len; i++) {
      arg = settings.required[keys[i]];
      result.required[arg.name] = args.splice(0, 1)[0];
    }
  },
  collectOptionalArguments: function collectOptionalArguments(settings, args, result, errors) {
    if (!result.optional) {
      result.optional = {};
    }

    var keys = Object.keys(settings.optional);
    var len = keys.length;

    if (len === 0) {
      return;
    }

    var arg = undefined;
    for (var i = 0; i < len; i++) {
      arg = settings.optional[keys[i]];

      // Stop a soon as we find an option.
      if (args[0] && args[0].indexOf('-') > -1) {
        return;
      }

      result.optional[arg.name] = args.splice(0, 1)[0];
    }
  },
  collectionOptions: function collectionOptions(settings, args, result, errors) {
    if (!result.options) {
      result.options = {};
    }

    var keys = Object.keys(settings.options);

    if (keys.length === 0) {
      return;
    }

    var option = undefined;
    var pos = undefined;

    keys.forEach(function (key) {
      option = settings.options[key];
      pos = args.indexOf(option.name);

      if (pos > -1) {
        if (!option.value) {
          result.options[option.name] = true;
          return;
        }

        if (args[pos + 1] && args[pos + 1].indexOf('-') === -1) {
          result.options[option.name] = args[pos + 1];
          return;
        }

        errors.push('The option ' + option.name + ' is missing a value!');
      }
    });
  }
};

exports.default = Parser;