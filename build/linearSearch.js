"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = linearSearch;

var _Comparator = require("./utils/Comparator");

var _Comparator2 = _interopRequireDefault(_Comparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Linear search implementation.
 *
 * @param {*[]} array
 * @param {*} seekElement
 * @param {function(a, b)} [comparatorCallback]
 * @return {number[]}
 */
function linearSearch(array, seekElement, comparatorCallback) {
  var comparator = new _Comparator2.default(comparatorCallback);
  var foundIndices = [];

  array.forEach(function (element, index) {
    if (comparator.equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}