"use strict";

var _bloomfilter = require("./EDs/bloomfilter");

var _bloomfilter2 = _interopRequireDefault(_bloomfilter);

var _stringGenerator = require("./utils/stringGenerator");

var _stringGenerator2 = _interopRequireDefault(_stringGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bf = new _bloomfilter2.default();

var NotExistent = "essa string não existe dentro desse espaço de memória";

//insere 2000 items
for (var i = 0; i < 2000; i++) {
  var str = (0, _stringGenerator2.default)(20);
  bf.insert(str);
}
var startUsage = process.cpuUsage();

console.log(bf.mayContain(NotExistent));

//procurar uma entrada que não foi inserida na lista
var usedCpu = process.cpuUsage(startUsage);

var usedMem = process.memoryUsage().heapUsed / 1024 / 1024;

//calculando o uso de cpu
console.log("O script usou aproximadamente " + Math.round(usedMem * 100) / 100 + " MB");
console.log(usedCpu.user + usedCpu.system + "  miliseconds");