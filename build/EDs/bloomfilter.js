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
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000000;

    _classCallCheck(this, BloomFilter);

    // O tamanho do   Bloom Fil ter afeta diretamente os falso positivos.
    // Quanto maior o tamanho, mnenor a chance de ocorrerem falsos positivos.
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

      // Coloca cada valor do hash como verdadeiro
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
          // Então, sabemos que os valores não foram inseridos
          return false;
        }
      }

      // O item pode ou nao ter sido inserido
      return true;
    }

    /**
     *
     * Cria um storage para encapsular os dados e
     * apenas utilizar os dados necessários.
     * O storage é basicamente é inicializado como
     * um array cheio de 'false'
     *
     * @param {number} size
     * @return {Object}
     */

  }, {
    key: "createStore",
    value: function createStore(size) {
      var storage = [];

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
        hash &= hash; // Converte para um inteiro de 32bits
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
        hash &= hash; // Converte para um inteiro de 32bits
      }

      return Math.abs(hash % this.size);
    }

    /**
     * Faz as 3 funções de hash na entrada e retorna um array
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