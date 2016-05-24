'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

var _state = require('../state');

var _state2 = _interopRequireDefault(_state);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _typeof = require('../util/typeof');

var _typeof2 = _interopRequireDefault(_typeof);

var _cliWidth = require('cli-width');

var _cliWidth2 = _interopRequireDefault(_cliWidth);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

var _screenmanager = require('./screenmanager');

var _screenmanager2 = _interopRequireDefault(_screenmanager);

var _readline = require('./readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderEngine = {
  rl: _readline2.default,
  screenManager: new _screenmanager2.default(_readline2.default),
  lastOutput: [],
  action: undefined,
  listeners: {},
  exitOnFirstRender: undefined,
  previousActionDidExitOnFirstRender: undefined,

  /*
    Setups
   */
  setupListeners: function setupListeners() {
    this.listeners = {
      keyboardDidFireChar: RenderEngine.keyboardDidFireChar.bind(this),
      keyboardDidFireEvent: RenderEngine.keyboardDidFireEvent.bind(this)
    };
  },
  setup: function setup() {
    this.setupListeners();
  },
  start: function start() {
    // Start the whole process.
    this.listen();
    this.render();
  },
  finished: function finished() {
    _screen2.default.exit(this.rl);
  },
  setAction: function setAction() {
    if (!_state2.default.actions.queue[0]) {
      RE.finished();
      return;
    }

    var item = _state2.default.actions.queue.splice(0, 1)[0];
    RE.action = new item.action();
    RE.action.props = item.args || [];
    RE.action.input = new _input2.default();
    RE.action.componentDidMount();
  },
  listen: function listen() {
    _keyboard2.default.on('char', this.listeners.keyboardDidFireChar);
    _keyboard2.default.on('backspace', this.keyboardDidFireChar);
    _keyboard2.default.on('event', this.keyboardDidFireEvent);
  },
  keyboardDidFireEvent: function keyboardDidFireEvent(event) {
    if (!RenderEngine.action) {
      return;
    }
    if (RenderEngine.action && RenderEngine.action.userInputDidFireEvent) {
      RenderEngine.action.userInputDidFireEvent(event);
    }
    RenderEngine.render(RenderEngine.action);
  },
  keyboardDidFireChar: function keyboardDidFireChar(char) {
    if (!RenderEngine.action) {
      return;
    }
    if (RenderEngine.action && RenderEngine.action.userInputDidUpdate) {
      if (!char) {
        char = -1;
      } // -1 means backspace!
      // console.log('userInputDidUpdate', Keyboard._events)
      RenderEngine.action.userInputDidUpdate(char);
    }
    RenderEngine.action.input._data.push(char);
    RenderEngine.render(RenderEngine.action);
  },
  removeAction: function removeAction() {
    if (!this.action) {
      return;
    }
    if (this.action.componentDidUnmount) {
      this.action.componentDidUnmount();
    }
    this.previousActionDidExitOnFirstRender = this.exitOnFirstRender ? true : false;
    this.exitOnFirstRender = undefined;
    this.lastOutput = [];
    this.action = undefined;
  },
  render: function render(action) {
    if (action !== this.action) {
      return;
    }

    if (!RE.action) {
      RE.setAction();
    }

    if (!RE.action) {
      this.finished();
      return;
    }

    // Render new output
    var output = RE.action.render();
    if ((0, _typeof2.default)(output, 'string')) {
      output = [output];
    }

    if (!(0, _typeof2.default)(output, 'array')) {
      output = [output.toString()];
    }

    RE.lastOutput = output;

    var exit = false;
    if (!RE.action.componentShouldExit) {
      exit = true;
    } else if (RE.action.componentShouldExit() === true) {
      exit = true;
    }

    if (exit && this.exitOnFirstRender === undefined) {
      this.exitOnFirstRender = true;
    } else {
      this.exitOnFirstRender = false;
    }

    if (this.exitOnFirstRender === true) {
      if (this.previousActionDidExitOnFirstRender === false) {
        process.stdout.write('\n');
      }
      console.log(output.join('\n'));
    } else {
      RE.screenManager.render(output.join('\n'));
    }

    if (exit) {
      RE.removeAction();
      RE.render();
    }
  }
};

var RE = RenderEngine;
RE.setup();

exports.default = RenderEngine;