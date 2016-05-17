'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _thesuitcaseUid = require('thesuitcase-uid');

var _thesuitcaseUid2 = _interopRequireDefault(_thesuitcaseUid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Executer = {
  callbackIds: [],
  queue: undefined,
  command: undefined,

  start: function start(command) {
    if (!command) {
      this.queue = _state2.default.queue;
      _state2.default.queue.isActive = true;
    } else {
      _state2.default.queue.isActive = true;
      var merged = _state2.default.queue.merge(command.state.queue);
      this.queue = merged;
      _state2.default.queue = merged;
      command.state.queue = merged;
      this.command = command;
    }

    if (_state2.default.welcome) {
      _index2.default.log(_state2.default.welcome);
    }

    this.next();
  },
  next: function next() {
    if (this.queue.queue.length === 0) {
      // The queue is active, so the queue will add the
      // action to the front of the queue.
      // Therefore we must add the exit action
      // before the goodby log.
      _index2.default.exit();

      if (_state2.default.goodby) {
        _index2.default.log(_state2.default.goodby);
      }

      this.next();
      return;
    }

    var item = this.queue.queue[0];

    if (!_actions2.default.actions[item.action]) {
      this.next();
      return;
    }

    _actions2.default.actions[item.action]({
      pyramid: _index2.default,
      command: this.command,
      args: item.args || [],
      cb: this.actionDidFinish.bind(this)
    });
  },
  actionDidFinish: function actionDidFinish(answer) {
    var item = this.queue.queue.splice(0, 1)[0];

    // Ignore these event to preven clutering the action listener.
    if (['log', 'error', 'warning', 'success'].indexOf(item.action) > -1) {
      this.next();
      return;
    }

    if (item.cb) {
      item.cb(answer, this.userNext.bind(this, (0, _thesuitcaseUid2.default)()));
      return;
    } else if (this.command && this.command._events.action) {
      this.command.emit('action', item.action, answer, this.userNext.bind(this, (0, _thesuitcaseUid2.default)()));
      return;
    }
    this.next();
  },

  // Prevent the user/action from calling the callback twice
  userNext: function userNext(id) {
    if (this.callbackIds.indexOf(id) > -1) {
      return;
    }
    this.callbackIds.push(id);

    // Prevent an every growning array.
    if (this.callbackIds.length > 500) {
      this.callbackIds = [];
    }
    this.next();
  },
  bindActions: function bindActions(scope, queue) {
    Object.keys(_actions2.default.actions).forEach(function (action) {
      if (scope[action]) {
        return;
      }
      scope[action] = queue.addWithScope.bind(queue, scope, action);
    });
  }
};

exports.default = Executer;