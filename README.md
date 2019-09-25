# BloomFilter-tests

Trabalho especificamente de segurança, mas ficará como um estudo.

Bloom Filters são particularmente eficientes para checar se certos endereços de email
ou usuário já foram utilizados. Ao invés de checar um array de emails, ou de usuáros,
um por um, tendo assim uma complexidade de O(n). O bloom filter é bem perto de O(1).

O bloom filter pode dizer com certeza se algo está ausente, mas não com certeza se algo está presente.

A vantagem de bloomFilters é que eles usam muito menos espaço do que outras estruturas como a hash table,
por exemplo. Bloom filter por não usar muito espaço, não gasta tempo com leitura e escrita em disco.

Eu usei javascript ES6 para fazer esse bloom filter. Para fazer ele rodar, tem que rodar o comando 'yar run build' e executar o 'node'na pasta buid
