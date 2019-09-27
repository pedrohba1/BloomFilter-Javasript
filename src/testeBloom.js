const startUsage = process.cpuUsage();

import BloomFilter from "./bloomfilter";
import generateRandomString from "./utils/stringGenerator";

var bf = new BloomFilter();

for (let i = 0; i < 2000; i++) {
  let str = generateRandomString(20);
  bf.insert(str);
}

for (let i = 0; i < bf.size; i++) {
  if (bf.storage.getValue(i) === false) {
  }
}

const usedMem = process.memoryUsage().heapUsed / 1024 / 1024;

//calculando o uso de cpu
const usedCpu = process.cpuUsage(startUsage);
console.log(
  `O script usou aproximadamente ${Math.round(usedMem * 100) / 100} MB`
);
console.log(usedCpu);
