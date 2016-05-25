'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _typeof = require('../util/typeof');

var _typeof2 = _interopRequireDefault(_typeof);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _regexParameter = require('../util/regexParameter');

var _regexParameter2 = _interopRequireDefault(_regexParameter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parameters = (function () {
  function Parameters(command) {
    _classCallCheck(this, Parameters);

    this.command = command;

    this.errors = [];
    this.required = {};
    this.optional = {};
    this.options = {};

    return this;
  }

  _createClass(Parameters, [{
    key: 'parse',
    value: function parse(type, args) {
      switch (type) {
        case 'required':
          this.processParameter(this.required, args);
          break;
        case 'optional':
          this.processParameter(this.optional, args);
          break;
        case 'option':
          this.addOption(this.options, args);
          break;
      }
    }
  }, {
    key: 'processParameter',
    value: function processParameter(store, args) {
      var _this = this;

      // Support for multiple entries.
      // args: Object, undefined
      if (_util2.default.isObject(args[0])) {
        var keys = Object.keys(args[0]);

        keys.forEach(function (key) {
          _this.processParameter(store, [key, args[key]]);
        });
        return this;
      }

      // Support of single entries.
      var result = {
        description: undefined
      };

      var errors = [];

      // Hanle the first argument
      switch ((0, _typeof2.default)(args[0])) {
        case 'string':
          result.name = args[0];
          break;
        default:
          errors.push('The first argument must be either a string or an object!');
          return { error: error, result: result };
      }

      // Handle the seconds argument
      switch ((0, _typeof2.default)(args[1])) {
        case 'string':
          result.description = args[1];
          break;
        case 'object':
          Object.assign(result, args[1]);
          break;
        default:
          errors.push('The first argument must be either a string or an object!');
          return;
      }

      // Validate the input
      result.name = result.name.replace(' ', '');

      // Name must be a string otherwise we cancel this attempt.
      if (!(0, _typeof2.default)(result.name, 'string')) {
        errors.push({
          command: this.command,
          type: 'name',
          message: 'The name must be a string!'
        });
        return;
      }

      // Description and validation can be faulty,
      // they will be removed from the result.
      if (result.description !== undefined && !(0, _typeof2.default)(result.description, 'string')) {
        delete result.description;
        errors.push({
          command: this.command,
          type: 'description',
          message: 'The description must be a string!'
        });
      }

      if (result.validate !== undefined && !(0, _typeof2.default)(result.validate, 'function', 'regexp')) {
        delete result.validate;
        errors.push({
          command: this.command,
          type: 'validate',
          message: 'The validate field must be a regex or a function!'
        });
      } else {
        if ((0, _typeof2.default)(result.validate, 'regexp')) {
          result.validate = _regexParameter2.default.bind(null, result.validate);
        }
      }

      // Store the newly gained errors.
      this.errors = this.errors.concat(errors);

      if (store[result.name]) {
        Object.assign(store[result.name], result);
      } else {
        store[result.name] = result;
      }

      return;
    }
  }, {
    key: 'addOption',
    value: function addOption(store, args) {
      var _this2 = this;

      var items = [];

      switch ((0, _typeof2.default)(args[0])) {
        case 'string':
          items.push([args[0], args[1]]);
          break;
        case 'object':
          var keys = Object.keys(args[0]);

          keys.forEach(function (key) {
            items.push([key, args[0][key]]);
          });
          break;
      }

      var names = undefined;
      items.forEach(function (item) {
        names = item[0].split(' ');

        if (_util2.default.isString(item[1])) {
          item[1] = { description: item[1] };
        }

        item[1].siblings = names;

        names.forEach(function (name) {
          _this2.processParameter(store, [name, item[1]]);
        });
      });

      return;
    }
  }]);

  return Parameters;
})();

exports.default = Parameters;