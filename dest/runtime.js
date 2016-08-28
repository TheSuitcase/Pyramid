'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arguments = require('./arguments');

var _arguments2 = _interopRequireDefault(_arguments);

var _renderengine = require('./renderengine');

var _renderengine2 = _interopRequireDefault(_renderengine);

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Runtime = {
  start: function start() {
    var _this = this;

    // Collecting bin for all the actions...
    var queue = [];

    /*
      Arguments
     */
    this.args = new _arguments2.default();
    var valid = this.args.parse();

    /*
      Render Engine
     */
    if (valid) {
      queue = _queue2.default.concat(this.args.command.state.queue);
    } else {
      queue = _queue2.default;
    }
    console.log(queue);
    this.renderEngine = new _renderengine2.default(queue);

    this.renderEngine.on('exit', function () {
      console.log(_this.args.arguments, _this.args.options, _this.renderEngine.responses);
      _this.exit();
    });
  },
  exit: function exit() {
    process.exit();
  }
};

exports.default = Runtime;