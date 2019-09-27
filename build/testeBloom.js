"use strict";

var _bloomfilter = require("./bloomfilter");

var _bloomfilter2 = _interopRequireDefault(_bloomfilter);

var _stringGenerator = require("./utils/stringGenerator");

var _stringGenerator2 = _interopRequireDefault(_stringGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startUsage = process.cpuUsage();

var bf = new _bloomfilter2.default();

for (var i = 0; i < 2000; i++) {
  var str = (0, _stringGenerator2.default)(20);
  bf.insert(str);
}

for (var _i = 0; _i < bf.size; _i++) {
  if (bf.storage.getValue(_i) === false) {}
}

var usedMem = process.memoryUsage().heapUsed / 1024 / 1024;

//calculando o uso de cpu
var usedCpu = process.cpuUsage(startUsage);
console.log("The script uses approximately " + Math.round(usedMem * 100) / 100 + " MB");
console.log(usedCpu);