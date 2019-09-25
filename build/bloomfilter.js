"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BloomFilter = function () {
  /**
   * @param {number} size - the size of the storage.
   */
  function BloomFilter() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    _classCallCheck(this, BloomFilter);

    // Bloom filter size directly affects the likelihood of false positives.
    // The bigger the size the lower the likelihood of false positives.
    this.size = size;
    this.storage = this.createStore(size);
  }

  /**
   * @param {string} item
   */


  _createClass(BloomFilter, [{
    key: "insert",
    value: function insert(item) {
      var _this = this;

      var hashValues = this.getHashValues(item);

      // Set each hashValue index to true.
      hashValues.forEach(function (val) {
        return _this.storage.setValue(val);
      });
    }

    /**
     * @param {string} item
     * @return {boolean}
     */

  }, {
    key: "mayContain",
    value: function mayContain(item) {
      var hashValues = this.getHashValues(item);

      for (var hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1) {
        if (!this.storage.getValue(hashValues[hashIndex])) {
          // We know that the item was definitely not inserted.
          return false;
        }
      }

      // The item may or may not have been inserted.
      return true;
    }

    /**
     * Creates the data store for our filter.
     * We use this method to generate the store in order to
     * encapsulate the data itself and only provide access
     * to the necessary methods.
     *
     * @param {number} size
     * @return {Object}
     */

  }, {
    key: "createStore",
    value: function createStore(size) {
      var storage = [];

      // Initialize all indexes to false
      for (var storageCellIndex = 0; storageCellIndex < size; storageCellIndex += 1) {
        storage.push(false);
      }

      var storageInterface = {
        getValue: function getValue(index) {
          return storage[index];
        },
        setValue: function setValue(index) {
          storage[index] = true;
        }
      };

      return storageInterface;
    }

    /**
     * @param {string} item
     * @return {number}
     */

  }, {
    key: "hash1",
    value: function hash1(item) {
      var hash = 0;

      for (var charIndex = 0; charIndex < item.length; charIndex += 1) {
        var char = item.charCodeAt(charIndex);
        hash = (hash << 5) + hash + char;
        hash &= hash; // Convert to 32bit integer
        hash = Math.abs(hash);
      }

      return hash % this.size;
    }

    /**
     * @param {string} item
     * @return {number}
     */

  }, {
    key: "hash2",
    value: function hash2(item) {
      var hash = 5381;

      for (var charIndex = 0; charIndex < item.length; charIndex += 1) {
        var char = item.charCodeAt(charIndex);
        hash = (hash << 5) + hash + char; /* hash * 33 + c */
      }

      return Math.abs(hash % this.size);
    }

    /**
     * @param {string} item
     * @return {number}
     */

  }, {
    key: "hash3",
    value: function hash3(item) {
      var hash = 0;

      for (var charIndex = 0; charIndex < item.length; charIndex += 1) {
        var char = item.charCodeAt(charIndex);
        hash = (hash << 5) - hash;
        hash += char;
        hash &= hash; // Convert to 32bit integer
      }

      return Math.abs(hash % this.size);
    }

    /**
     * Runs all 3 hash functions on the input and returns an array of results.
     *
     * @param {string} item
     * @return {number[]}
     */

  }, {
    key: "getHashValues",
    value: function getHashValues(item) {
      return [this.hash1(item), this.hash2(item), this.hash3(item)];
    }
  }]);

  return BloomFilter;
}();

exports.default = BloomFilter;