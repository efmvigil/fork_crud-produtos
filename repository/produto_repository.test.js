const produtoRepository = require('./produto_repository.js');

//Cenário de sucesso
test('Quando inserir o produto arroz, deve retornar e conter na lista o produto com id=1', () => {
  //produto que se espera ser cadastrado (com id)
  const produtoInseridoEsperado = {
    id: 1,
    nome: 'Arroz',
    categoria: 'alimento',
    preco: 4.0,
  };
  //Inserindo o produto no repositorio
  const produtoInserido = produtoRepository.inserir({
    nome: 'Arroz',
    categoria: 'alimento',
    preco: 4.0,
  });
  //Verificando se o produto inserido que retornou está correto
  expect(produtoInserido).toEqual(produtoInseridoEsperado);
  //Verificando se o produto foi inserido no repositório
  expect(produtoRepository.listar()).toContainEqual(produtoInseridoEsperado);
});

//Cenário de exceção
test('Quando inserir o produto sem categoria, não deve retornar e não insere na lista', () => {
  //Criado o cenário (com id=2 porque conta o teste anterior) para o produto inserido sem categoria
  const produtoInseridoErrado = {
    id: 2,
    nome: 'Massa',
    preco: 4.0,
  };
  //Inserindo o produto sem categoria
  const produtoInserido = produtoRepository.inserir({
    nome: 'Massa',
    preco: 4.0,
  });
  //O produto não deve retornar
  expect(produtoInserido).toEqual(undefined);
  //Não deve inserir na lista o produto errado
  expect(produtoRepository.listar()).not.toContainEqual(produtoInseridoErrado);
});

//Cenário de sucesso - buscarPorId()
test('Quando buscar por um id existente, deve retornar o dado corretamente', () => {
  //Vou inserir um segundo produto para o teste (id=2)
  const produtoInserido = produtoRepository.inserir({
    nome: 'Feijao',
    categoria: 'alimento',
    preco: 7.0,
  });
  const resultado = produtoRepository.buscarPorId(produtoInserido.id);
  //Podemos fazer testes mais simples:
  expect(resultado).toBeDefined();
  expect(resultado.nome).toBe('Feijao');
});

//Cenário de exceção - buscarPorId()
test('Quando buscar por id inexistente, deve retornar undefined', () => {
  const resultado = produtoRepository.buscarPorId(10);
  expect(resultado).toBeUndefined();
});

//Cenário de sucesso - atualizar()
test('Quando atualizar o produto arroz, deve retornar o produto alterado corretamente', () => {
  const produtoAtualizadoEsperado = {
    id: 5,
    nome: 'Arroz branco',
    categoria: 'Alimento',
    preco: 5.0,
  };
  const produtoAtalizado = produtoRepository.atualizar(1, {
    id: 5,
    nome: 'Arroz branco',
    categoria: 'Alimento',
    preco: 5.0,
  });
  expect(produtoAtalizado).toEqual(produtoAtualizadoEsperado);
  expect(produtoRepository.listar()).toContainEqual(produtoAtualizadoEsperado);
});

//Cenário de exceção - atualizar()
test('Quando tentar atualizar o produto sem nome, nenhuma alteração deve ser feita e deve retornar undefined', () => {
  const produtoAtualizadoErrado = {
    id: 6,
    categoria: 'Alimento',
    preco: 10.0,
  };
  const produtoAtalizado = produtoRepository.atualizar(5, {
    id: 6,
    categoria: 'Alimento',
    preco: 10.0,
  });
  //O produto não deve retornar
  expect(produtoAtalizado).toEqual(undefined);
  //Não deve encontrar na lista o produto errado
  expect(produtoRepository.listar()).not.toContainEqual(
    produtoAtualizadoErrado
  );
});

//Cenário de sucesso - deletar()
test('Quando deletar o produto com id=5, o elemento correto deve ser removido da lista e retornado', () => {
  const produtoDeletado = produtoRepository.deletar(5);
  const produtoDeletadoEsperado = {
    id: 5,
    nome: 'Arroz branco',
    categoria: 'Alimento',
    preco: 5,
  };
  //A função deletar deve retornar o produto deletado
  expect(produtoDeletado).toEqual(produtoDeletadoEsperado);
  ////Não deve encontrar na lista o produto deletado
  expect(produtoRepository.listar()).not.toContainEqual(
    produtoDeletadoEsperado
  );
});

//Cenário de exceção - deletar()
test('Quando tentar deletar produto com id inválido, nada deve ser alterado ou retornado', () => {
  const lista = produtoRepository.listar();
  const produtoDeletadoErrado = produtoRepository.deletar(10);

  //O produto não deve retornar
  expect(produtoDeletadoErrado).toEqual(undefined);
  //Verifica se houve alteração na lista
  expect(produtoRepository.listar()).toEqual(lista);
});

//Cenário de sucesso - pesquisar por categoria()
test('Quando pesquisar pela categoria "alimento", deve retornar a lista de produtos correta', () => {
  const listaEsperada = [
    {
      id: 2,
      nome: 'Feijao',
      categoria: 'alimento',
      preco: 7.0,
    },
  ];
  const pesquisa = produtoRepository.pesquisarPorCategoria('alimento');

  //Verifica se retornou o elemento correto
  expect(pesquisa).toEqual(listaEsperada);
});

//Cenário de exceção - pesquisar por categoria()
test('Quando pesquisar por categoria inválida, não deve retornar nada', () => {
  const listaEsperada = [];
  const pesquisa = produtoRepository.pesquisarPorCategoria('alimento0');

  //Verifica se retornou uma lista vazia
  expect(pesquisa).toEqual(listaEsperada);
});
