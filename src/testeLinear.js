import generateRandomString from "./utils/stringGenerator";

//construindo array;

var arr = new Array(2000000);
var NotExistent = "essa string não existe dentro desse espaço de memória";

for (let i = 0; i < 2000; i++) {
  let str = generateRandomString(20);
  arr.push(str);
}
const startUsage = process.cpuUsage();
//aqui faz a busca linear

arr.forEach(element => {
  if (element === NotExistent) {
    console.log("achou");
  }
});

const usedCpu = process.cpuUsage(startUsage);
const usedMem = process.memoryUsage().heapUsed / 1024 / 1024;

console.log(
  `O script usou aproximadamente ${Math.round(usedMem * 100) / 100} MB`
);
console.log(usedCpu.user + usedCpu.system);
