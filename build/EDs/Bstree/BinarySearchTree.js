"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BinarySearchTreeNode = require("./BinarySearchTreeNode");

var _BinarySearchTreeNode2 = _interopRequireDefault(_BinarySearchTreeNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinarySearchTree = function () {
  /**
   * @param {function} [nodeValueCompareFunction]
   */
  function BinarySearchTree(nodeValueCompareFunction) {
    _classCallCheck(this, BinarySearchTree);

    this.root = new _BinarySearchTreeNode2.default(null, nodeValueCompareFunction);

    // Steal node comparator from the root.
    this.nodeComparator = this.root.nodeComparator;
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */


  _createClass(BinarySearchTree, [{
    key: "insert",
    value: function insert(value) {
      return this.root.insert(value);
    }

    /**
     * @param {*} value
     * @return {boolean}
     */

  }, {
    key: "contains",
    value: function contains(value) {
      return this.root.contains(value);
    }

    /**
     * @param {*} value
     * @return {boolean}
     */

  }, {
    key: "remove",
    value: function remove(value) {
      return this.root.remove(value);
    }

    /**
     * @return {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.root.toString();
    }
  }]);

  return BinarySearchTree;
}();

exports.default = BinarySearchTree;