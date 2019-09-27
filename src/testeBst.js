import generateRandomString from "./utils/stringGenerator";
import BinarySearchTree from "./EDs/Bstree/BinarySearchTree";

var NotExistent = "essa string não existe dentro desse espaço de memória";

var bst = new BinarySearchTree();

for (let i = 0; i < 200000; i++) {
  let str = generateRandomString(20);
  bst.insert(str);
}

const startUsage = process.cpuUsage();

bst.contains(NotExistent);
//procurar uma entrada que não foi inserida na lista
const usedCpu = process.cpuUsage(startUsage);
const usedMem = process.memoryUsage().heapUsed / 1024 / 1024;

console.log(
  `O script usou aproximadamente ${Math.round(usedMem * 100) / 100} MB`
);
console.log(usedCpu.user + usedCpu.system + "  miliseconds");
