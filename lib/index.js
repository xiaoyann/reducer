'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bali = require('bali.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Reducer = function () {
  function Reducer() {
    _classCallCheck(this, Reducer);

    this.reducers = {};
  }

  /**
   * register reducer
   * @param  {string}   type  Redux action Type
   * @param  {string}   path  
   * @param  {Function} fn    Redux reducer
   */


  _createClass(Reducer, [{
    key: 'register',
    value: function register(type, path, fn) {
      var conf = this.reducers[path] || {};
      conf[type] = fn;
      this.reducers[path] = conf;
    }

    /**
     * @param  {any} state  
     * @param  {object} action 
     * @return state
     */

  }, {
    key: 'reduce',
    value: function reduce(state, action) {
      var type = action.type;
      var path = action.path;
      var conf = this.reducers[path];

      if (!conf) return state;

      state = (0, _bali.cloneWithPath)(state, path);

      var keys = path.split('.');
      var name = keys.pop();
      var fn = conf[type];

      var parent = keys.reduce(function (pre, cur) {
        return pre = pre[cur];
      }, state);
      parent[name] = fn(parent[name], action.data);

      return state;
    }
  }]);

  return Reducer;
}();

exports.default = Reducer;