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

var _colors = require('../colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderEngine = {
  rl: _readline2.default,
  screenManager: new _screenmanager2.default(_readline2.default),
  lastOutput: [],
  action: undefined,
  listeners: {},
  exitOnFirstRender: undefined,
  previousActionDidExitOnFirstRender: undefined,
  lastRenderWasWithScreenManager: false,

  response: undefined,
  responses: [],

  active: false,

  cb: undefined,

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
  start: function start(cb) {
    if (this.active) {
      return false;
    }
    this.active = true;
    this.cb = cb;
    // Start the whole process.
    this.listen();
    this.render();
    return true;
  },
  finished: function finished() {
    if (this.active === false) {
      return;
    }
    this.active = false;
    if (this.cb) {
      this.cb(this.responses);
      return;
    }
    _screen2.default.exit(RenderEngine.exitOnFirstRender ? false : true);
  },
  setResponse: function setResponse() {
    var response = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    RE.response = response;
  },
  setAction: function setAction() {
    if (!_state2.default.actions.queue[0]) {
      return;
    }

    var item = _state2.default.actions.queue.splice(0, 1)[0];
    RE.action = new item.action();
    RE.action.props = item.args || [];
    RE.action.input = new _input2.default();
    if (RE.action.componentDidMount) {
      RE.action.componentDidMount();
    }
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
    if (!char) {
      char = -1;
    } // -1 means backspace!

    if (RenderEngine.action && RenderEngine.action.userInputDidUpdate) {
      RenderEngine.action.userInputDidUpdate(char);
    }

    if (char === -1) {
      RenderEngine.action.input.pop();
    } else {
      RenderEngine.action.input._data.push(char);
    }
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

    if (this.response !== undefined) {
      this.responses.push({ type: this.action.constructor.name.toLowerCase(), response: this.response });
    }
    this.response = undefined;

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
      process.stdout.write(output.join('\n') + '\n');
      RE.lastRenderWasWithScreenManager = false;
    } else if (exit) {
      RE.screenManager.render(output.join('\n'));
      if (RE.lastRenderWasWithScreenManager) {
        console.log(' ');
      }
      RE.lastRenderWasWithScreenManager = false;
    } else {
      RE.screenManager.render(output.join('\n'));
      RE.lastRenderWasWithScreenManager = true;
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