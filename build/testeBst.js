"use strict";

var _stringGenerator = require("./utils/stringGenerator");

var _stringGenerator2 = _interopRequireDefault(_stringGenerator);

var _BinarySearchTree = require("./EDs/Bstree/BinarySearchTree");

var _BinarySearchTree2 = _interopRequireDefault(_BinarySearchTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotExistent = "essa string não existe dentro desse espaço de memória";

var bst = new _BinarySearchTree2.default();

for (var i = 0; i < 200000; i++) {
  var str = (0, _stringGenerator2.default)(20);
  bst.insert(str);
}

var startUsage = process.cpuUsage();

bst.contains(NotExistent);
//procurar uma entrada que não foi inserida na lista
var usedCpu = process.cpuUsage(startUsage);
var usedMem = process.memoryUsage().heapUsed / 1024 / 1024;

console.log("O script usou aproximadamente " + Math.round(usedMem * 100) / 100 + " MB");
console.log(usedCpu.user + usedCpu.system + "  miliseconds");