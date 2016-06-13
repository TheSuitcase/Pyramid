'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pyramid = require('../pyramid');

var _pyramid2 = _interopRequireDefault(_pyramid);

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

var _state = require('../state');

var _state2 = _interopRequireDefault(_state);

var _renderengine = require('../renderengine');

var _renderengine2 = _interopRequireDefault(_renderengine);

var _screen = require('../renderengine/screen');

var _screen2 = _interopRequireDefault(_screen);

var _typeof = require('../util/typeof');

var _typeof2 = _interopRequireDefault(_typeof);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Executer = {
  parse: function parse() {
    var input = arguments.length <= 0 || arguments[0] === undefined ? process.argv : arguments[0];

    var next = undefined,
        command = undefined,
        errors = undefined;

    // Remove unimportant arguments.
    input = this.prepareInput(input);

    // Handle input like: input.length === 0 etc.
    next = this.filterUninterestingInput(input);

    // Find a matching command.
    if (next) {
      command = this.findMatchingCommand(input);
    }

    if (command) {
      _state2.default.set({ command: command });
      errors = this.parseCommand(command, input);
    }

    // Add the parse error to the action queue.
    if (errors) {
      this.addErrorToQueue(errors);
    }

    // Combine the action queues
    if (command && !errors) {
      this.combineActionQueues(command);
    }

    _renderengine2.default.start(this.renderEngineDidFinish.bind(this, command));
  },
  renderEngineDidFinish: function renderEngineDidFinish(command, answers) {
    if (command && command.state.callbacks.action) {
      var args = command.state.arguments;

      var exit = command.state.callbacks.action(args.required, args.optional, args.options, answers);

      if (_state2.default.actions.queue.length > 0) {
        _renderengine2.default.start(this.renderEngineDidFinish.bind(this, command));
        return;
      }

      if (exit !== false) {
        _screen2.default.exit();
        return;
      }
    } else {
      _screen2.default.exit();
    }
  },
  callOverflowCallback: function callOverflowCallback() {
    if (!_state2.default.callbacks.overflow) {
      return;
    }
    var errors = _state2.default.callbacks.overflow();

    if (!(0, _typeof2.default)(errors, 'string', 'array')) {
      return;
    }

    if ((0, _typeof2.default)(errors, 'string')) {
      errors = [errors];
    }

    return errors;
  },
  combineActionQueues: function combineActionQueues(command) {
    _state2.default.actions.merge(command.state.actions);
  },
  addErrorToQueue: function addErrorToQueue() {
    var errors = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    errors.forEach(function (error) {
      _pyramid2.default.error(error);
    });
  },
  parseCommand: function parseCommand(command, input) {
    // Strip the command name.
    var inputForCommand = input.slice(1, input.length);
    var args = command.parse(inputForCommand);

    if (args.errors.length > 0) {
      return args.errors;
    }

    return;
  },
  findMatchingCommand: function findMatchingCommand(input) {
    var command = _state2.default.commands[input[0]];

    if (command) {
      return command;
    }

    var errors = this.callOverflowCallback(input) || [];

    if (errors.length === 0) {
      errors.push('Your command ' + input[0] + ' does not exist!');
    }

    errors.forEach(function (error) {
      _pyramid2.default.error(error);
    });

    return;
  },
  prepareInput: function prepareInput(input) {
    if (input === process.argv) {
      // Remove the two unimportant arguments
      // without destroying the orignal process.argv
      input = input.slice(2, input.length);
    }

    return input;
  },
  filterUninterestingInput: function filterUninterestingInput(input) {
    // Filter out uninteresting input attempts.
    if (input.length === 0) {
      _pyramid2.default.error('Please enter a command!');
      return false;
    } else if (input.length > 40) {
      _pyramid2.default.error('You command contains to many arguments!');
      return false;
    }
    return true;
  }
};

exports.default = Executer;