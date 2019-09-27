export default class BloomFilter {
  /**
   * @param {number} size - the size of the storage.
   */
  constructor(size = 2000000) {
    // O tamanho do   Bloom Fil ter afeta diretamente os falso positivos.
    // Quanto maior o tamanho, mnenor a chance de ocorrerem falsos positivos.
    this.size = size;
    this.storage = this.createStore(size);
  }

  /**
   * @param {string} item
   */
  insert(item) {
    const hashValues = this.getHashValues(item);

    // Coloca cada valor do hash como verdadeiro
    hashValues.forEach(val => this.storage.setValue(val));
  }

  /**
   * @param {string} item
   * @return {boolean}
   */
  mayContain(item) {
    const hashValues = this.getHashValues(item);

    for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1) {
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
  createStore(size) {
    const storage = [];

    for (
      let storageCellIndex = 0;
      storageCellIndex < size;
      storageCellIndex += 1
    ) {
      storage.push(false);
    }

    const storageInterface = {
      getValue(index) {
        return storage[index];
      },
      setValue(index) {
        storage[index] = true;
      }
    };

    return storageInterface;
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash1(item) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
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
  hash2(item) {
    let hash = 5381;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char; /* hash * 33 + c */
    }

    return Math.abs(hash % this.size);
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash3(item) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
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
  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }
}
