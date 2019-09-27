import BloomFilter from "./EDs/bloomfilter";
import generateRandomString from "./utils/stringGenerator";

var bf = new BloomFilter();

var NotExistent = "essa string não existe dentro desse espaço de memória";

//insere 2000 items
for (let i = 0; i < 2000; i++) {
  let str = generateRandomString(20);
  bf.insert(str);
}
const startUsage = process.cpuUsage();

console.log(bf.mayContain(NotExistent));

//procurar uma entrada que não foi inserida na lista
const usedCpu = process.cpuUsage(startUsage);

const usedMem = process.memoryUsage().heapUsed / 1024 / 1024;

//calculando o uso de cpu
console.log(
  `O script usou aproximadamente ${Math.round(usedMem * 100) / 100} MB`
);
console.log(usedCpu.user + usedCpu.system + "  miliseconds");
