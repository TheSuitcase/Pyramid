'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _typeof = require('../util/typeof');

var _typeof2 = _interopRequireDefault(_typeof);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Arguments = (function () {
  function Arguments(command) {
    _classCallCheck(this, Arguments);

    this.command = command;

    this.required = {};
    this.optional = {};
    this.options = {};

    this.errors = [];
  }

  _createClass(Arguments, [{
    key: 'generate',
    value: function generate() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      var clonedArgs = args.map(function (arg) {
        return arg;
      });

      this.collectRequiredArguments(clonedArgs);

      // Checkpoint!
      if (this.errors.length > 0) {
        return this;
      }

      this.collectOptionalArguments(clonedArgs);

      // Checkpoint!
      if (this.errors.length > 0) {
        return this;
      }

      this.collectionOptions(clonedArgs);

      // Checkpoint!
      if (this.errors.length > 0) {
        return this;
      }

      // User validate
      if (this.command.state.callbacks.validate) {
        this.validateWithUser();
      }

      return this;
    }
  }, {
    key: 'validateWithUser',
    value: function validateWithUser() {
      var _this = this;

      // NOTE: true and undefined will be ignore as a result!
      var result = this.command.state.callbacks.validate(this.required, this.optional, this.options);

      if (result === false) {
        this.errors.push('You command is invalid!');
        return;
      }

      if ((0, _typeof2.default)(result, 'array')) {
        result.forEach(function (error) {
          _this.errors.push(error);
        });
        return;
      }

      if ((0, _typeof2.default)(result, 'string')) {
        this.errors.push(result);
        return;
      }

      return;
    }
  }, {
    key: 'collectRequiredArguments',
    value: function collectRequiredArguments(args) {
      // Clear out the old.
      this.required = {};

      var params = this.command.state.parameters.required;
      var keys = Object.keys(params);
      var len = keys.length;

      if (len === 0) {
        return;
      }

      if (len > args.length) {
        this.errors.push('Please enter all the required arguments!');
        return;
      }

      var arg = undefined,
          input = undefined;
      for (var i = 0; i < len; i++) {
        arg = params[keys[i]];
        input = args.splice(0, 1)[0];

        // Validate the input when the developer has given us
        // an validate callback
        if (arg.validate) {
          var valid = arg.validate(input);

          if (valid === false) {
            this.errors.push('The argument ' + input + ' is invalid!');
            return;
          } else if (valid !== true) {
            this.errors.push(valid);
            return;
          }
        }

        this.required[arg.name] = input;
      }
    }
  }, {
    key: 'collectOptionalArguments',
    value: function collectOptionalArguments(args) {
      this.optional = {};

      var params = this.command.state.parameters.optional;
      var keys = Object.keys(params);
      var len = keys.length;

      if (len === 0) {
        return;
      }

      var arg = undefined,
          input = undefined;
      for (var i = 0; i < len; i++) {
        arg = params[keys[i]];

        // Stop a soon as we find an option.
        if (args[0] && args[0].indexOf('-') > -1) {
          return;
        }

        input = args.splice(0, 1)[0];

        // Validate the input when the developer has given us
        // an validate callback
        if (arg.validate) {
          var valid = arg.validate(input);

          if (valid === false) {
            this.errors.push('The argument ' + input + ' is invalid!');
            return;
          } else if (valid !== true) {
            this.errors.push(valid);
            return;
          }
        }

        this.optional[arg.name] = input;
      }
    }
  }, {
    key: 'collectionOptions',
    value: function collectionOptions(args) {
      var _this2 = this;

      this.options = {};

      var params = this.command.state.parameters.options;
      var keys = Object.keys(params);

      if (keys.length === 0) {
        return;
      }

      var option = undefined;
      var pos = undefined,
          input = undefined,
          validInput = undefined;

      keys.forEach(function (key) {
        option = params[key];
        pos = args.indexOf(option.name);
        input = args[pos + 1];
        validInput = undefined;

        if (pos > -1) {
          if (!option.value) {
            validInput = true;
          }

          if (input && input.indexOf('-') === -1) {
            validInput = input;
          } else {
            _this2.errors.push('The option ' + option.name + ' is missing a value!');
            return;
          }

          // Validate the input when the developer has given us
          // an validate callback
          if (validInput !== false && option.validate) {
            var valid = option.validate(input);

            if (valid === false) {
              _this2.errors.push('The argument ' + input + ' is invalid!');
              return;
            } else if (valid !== true) {
              _this2.errors.push(valid);
              return;
            }
          }

          // Store the input
          if (validInput) {
            _this2.options[option.name] = validInput;
          }
        }
      });
    }
  }]);

  return Arguments;
})();

exports.default = Arguments;