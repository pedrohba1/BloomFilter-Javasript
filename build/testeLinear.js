"use strict";

var _stringGenerator = require("./utils/stringGenerator");

var _stringGenerator2 = _interopRequireDefault(_stringGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//construindo array;

var arr = new Array(2000000);
var NotExistent = "essa string não existe dentro desse espaço de memória";

for (var i = 0; i < 2000; i++) {
  var str = (0, _stringGenerator2.default)(20);
  arr.push(str);
}
var startUsage = process.cpuUsage();
//aqui faz a busca linear

arr.forEach(function (element) {
  if (element === NotExistent) {
    console.log("achou");
  }
});

var usedCpu = process.cpuUsage(startUsage);
var usedMem = process.memoryUsage().heapUsed / 1024 / 1024;

console.log("O script usou aproximadamente " + Math.round(usedMem * 100) / 100 + " MB");
console.log(usedCpu.user + usedCpu.system);