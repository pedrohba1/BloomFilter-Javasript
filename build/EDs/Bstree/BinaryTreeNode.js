"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Comparator = require("../../utils/Comparator");

var _Comparator2 = _interopRequireDefault(_Comparator);

var _HashTable = require("../HashTable");

var _HashTable2 = _interopRequireDefault(_HashTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryTreeNode = function () {
  /**
   * @param {*} [value] - node value.
   */
  function BinaryTreeNode() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, BinaryTreeNode);

    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;

    // Any node related meta information may be stored here.
    this.meta = new _HashTable2.default();

    // This comparator is used to compare binary tree nodes with each other.
    this.nodeComparator = new _Comparator2.default();
  }

  /**
   * @return {number}
   */


  _createClass(BinaryTreeNode, [{
    key: "setValue",


    /**
     * @param {*} value
     * @return {BinaryTreeNode}
     */
    value: function setValue(value) {
      this.value = value;

      return this;
    }

    /**
     * @param {BinaryTreeNode} node
     * @return {BinaryTreeNode}
     */

  }, {
    key: "setLeft",
    value: function setLeft(node) {
      // Reset parent for left node since it is going to be detached.
      if (this.left) {
        this.left.parent = null;
      }

      // Attach new node to the left.
      this.left = node;

      // Make current node to be a parent for new left one.
      if (this.left) {
        this.left.parent = this;
      }

      return this;
    }

    /**
     * @param {BinaryTreeNode} node
     * @return {BinaryTreeNode}
     */

  }, {
    key: "setRight",
    value: function setRight(node) {
      // Reset parent for right node since it is going to be detached.
      if (this.right) {
        this.right.parent = null;
      }

      // Attach new node to the right.
      this.right = node;

      // Make current node to be a parent for new right one.
      if (node) {
        this.right.parent = this;
      }

      return this;
    }

    /**
     * @param {BinaryTreeNode} nodeToRemove
     * @return {boolean}
     */

  }, {
    key: "removeChild",
    value: function removeChild(nodeToRemove) {
      if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
        this.left = null;
        return true;
      }

      if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
        this.right = null;
        return true;
      }

      return false;
    }

    /**
     * @param {BinaryTreeNode} nodeToReplace
     * @param {BinaryTreeNode} replacementNode
     * @return {boolean}
     */

  }, {
    key: "replaceChild",
    value: function replaceChild(nodeToReplace, replacementNode) {
      if (!nodeToReplace || !replacementNode) {
        return false;
      }

      if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
        this.left = replacementNode;
        return true;
      }

      if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
        this.right = replacementNode;
        return true;
      }

      return false;
    }

    /**
     * @param {BinaryTreeNode} sourceNode
     * @param {BinaryTreeNode} targetNode
     */

  }, {
    key: "traverseInOrder",


    /**
     * @return {*[]}
     */
    value: function traverseInOrder() {
      var traverse = [];

      // Add left node.
      if (this.left) {
        traverse = traverse.concat(this.left.traverseInOrder());
      }

      // Add root.
      traverse.push(this.value);

      // Add right node.
      if (this.right) {
        traverse = traverse.concat(this.right.traverseInOrder());
      }

      return traverse;
    }

    /**
     * @return {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.traverseInOrder().toString();
    }
  }, {
    key: "leftHeight",
    get: function get() {
      if (!this.left) {
        return 0;
      }

      return this.left.height + 1;
    }

    /**
     * @return {number}
     */

  }, {
    key: "rightHeight",
    get: function get() {
      if (!this.right) {
        return 0;
      }

      return this.right.height + 1;
    }

    /**
     * @return {number}
     */

  }, {
    key: "height",
    get: function get() {
      return Math.max(this.leftHeight, this.rightHeight);
    }

    /**
     * @return {number}
     */

  }, {
    key: "balanceFactor",
    get: function get() {
      return this.leftHeight - this.rightHeight;
    }

    /**
     * Get parent's sibling if it exists.
     * @return {BinaryTreeNode}
     */

  }, {
    key: "uncle",
    get: function get() {
      // Check if current node has parent.
      if (!this.parent) {
        return undefined;
      }

      // Check if current node has grand-parent.
      if (!this.parent.parent) {
        return undefined;
      }

      // Check if grand-parent has two children.
      if (!this.parent.parent.left || !this.parent.parent.right) {
        return undefined;
      }

      // So for now we know that current node has grand-parent and this
      // grand-parent has two children. Let's find out who is the uncle.
      if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
        // Right one is an uncle.
        return this.parent.parent.right;
      }

      // Left one is an uncle.
      return this.parent.parent.left;
    }
  }], [{
    key: "copyNode",
    value: function copyNode(sourceNode, targetNode) {
      targetNode.setValue(sourceNode.value);
      targetNode.setLeft(sourceNode.left);
      targetNode.setRight(sourceNode.right);
    }
  }]);

  return BinaryTreeNode;
}();

exports.default = BinaryTreeNode;