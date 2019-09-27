"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BinaryTreeNode2 = require("./BinaryTreeNode");

var _BinaryTreeNode3 = _interopRequireDefault(_BinaryTreeNode2);

var _Comparator = require("../../utils/Comparator");

var _Comparator2 = _interopRequireDefault(_Comparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BinarySearchTreeNode = function (_BinaryTreeNode) {
  _inherits(BinarySearchTreeNode, _BinaryTreeNode);

  /**
   * @param {*} [value] - node value.
   * @param {function} [compareFunction] - comparator function for node values.
   */
  function BinarySearchTreeNode() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var compareFunction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, BinarySearchTreeNode);

    // This comparator is used to compare node values with each other.
    var _this = _possibleConstructorReturn(this, (BinarySearchTreeNode.__proto__ || Object.getPrototypeOf(BinarySearchTreeNode)).call(this, value));

    _this.compareFunction = compareFunction;
    _this.nodeValueComparator = new _Comparator2.default(compareFunction);
    return _this;
  }

  /**
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */


  _createClass(BinarySearchTreeNode, [{
    key: "insert",
    value: function insert(value) {
      if (this.nodeValueComparator.equal(this.value, null)) {
        this.value = value;

        return this;
      }

      if (this.nodeValueComparator.lessThan(value, this.value)) {
        // Insert to the left.
        if (this.left) {
          return this.left.insert(value);
        }

        var newNode = new BinarySearchTreeNode(value, this.compareFunction);
        this.setLeft(newNode);

        return newNode;
      }

      if (this.nodeValueComparator.greaterThan(value, this.value)) {
        // Insert to the right.
        if (this.right) {
          return this.right.insert(value);
        }

        var _newNode = new BinarySearchTreeNode(value, this.compareFunction);
        this.setRight(_newNode);

        return _newNode;
      }

      return this;
    }

    /**
     * @param {*} value
     * @return {BinarySearchTreeNode}
     */

  }, {
    key: "find",
    value: function find(value) {
      // Check the root.
      if (this.nodeValueComparator.equal(this.value, value)) {
        return this;
      }

      if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
        // Check left nodes.
        return this.left.find(value);
      }

      if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
        // Check right nodes.
        return this.right.find(value);
      }

      return null;
    }

    /**
     * @param {*} value
     * @return {boolean}
     */

  }, {
    key: "contains",
    value: function contains(value) {
      return !!this.find(value);
    }

    /**
     * @param {*} value
     * @return {boolean}
     */

  }, {
    key: "remove",
    value: function remove(value) {
      var nodeToRemove = this.find(value);

      if (!nodeToRemove) {
        throw new Error("Item not found in the tree");
      }

      var parent = nodeToRemove.parent;


      if (!nodeToRemove.left && !nodeToRemove.right) {
        // Node is a leaf and thus has no children.
        if (parent) {
          // Node has a parent. Just remove the pointer to this node from the parent.
          parent.removeChild(nodeToRemove);
        } else {
          // Node has no parent. Just erase current node value.
          nodeToRemove.setValue(undefined);
        }
      } else if (nodeToRemove.left && nodeToRemove.right) {
        // Node has two children.
        // Find the next biggest value (minimum value in the right branch)
        // and replace current value node with that next biggest value.
        var nextBiggerNode = nodeToRemove.right.findMin();
        if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
          this.remove(nextBiggerNode.value);
          nodeToRemove.setValue(nextBiggerNode.value);
        } else {
          // In case if next right value is the next bigger one and it doesn't have left child
          // then just replace node that is going to be deleted with the right node.
          nodeToRemove.setValue(nodeToRemove.right.value);
          nodeToRemove.setRight(nodeToRemove.right.right);
        }
      } else {
        // Node has only one child.
        // Make this child to be a direct child of current node's parent.
        /** @var BinarySearchTreeNode */
        var childNode = nodeToRemove.left || nodeToRemove.right;

        if (parent) {
          parent.replaceChild(nodeToRemove, childNode);
        } else {
          _BinaryTreeNode3.default.copyNode(childNode, nodeToRemove);
        }
      }

      // Clear the parent of removed node.
      nodeToRemove.parent = null;

      return true;
    }

    /**
     * @return {BinarySearchTreeNode}
     */

  }, {
    key: "findMin",
    value: function findMin() {
      if (!this.left) {
        return this;
      }

      return this.left.findMin();
    }
  }]);

  return BinarySearchTreeNode;
}(_BinaryTreeNode3.default);

exports.default = BinarySearchTreeNode;