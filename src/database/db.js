import Dexie from 'dexie';

// Criação do banco de dados
const db = new Dexie('SaudavelExpressDB');

// Definição das tabelas e seus campos
db.version(1).stores({
  Cliente:
    '++idCliente, Nome, email, senha, logradouro, numero, bairro, celular',
  Produto: '++idProduto, nome, descricao, valorUnitario, urlImg',
  Pedido:
    '++idPedido, idCliente, idProdutos, valorTotalPedido, idFormaPagamento',
  FormaPagamento: '++idFormaPagamento, formaPagamento',
});

// Exemplo de inicialização com dados (opcional)
db.on('populate', () => {
  db.Produto.bulkAdd([
    {
      nome: 'Produto 1',
      descricao: 'Descrição do Produto 1',
      valorUnitario: 10.0,
      urlImg: '/assets/images/produtos/1.png',
    },
    {
      nome: 'Produto 2',
      descricao: 'Descrição do Produto 2',
      valorUnitario: 20.0,
      urlImg: '/assets/images/produtos/2.png',
    },
    {
      nome: 'Produto 3',
      descricao: 'Descrição do Produto 3',
      valorUnitario: 30.0,
      urlImg: '/assets/images/produtos/3.png',
    },
    {
      nome: 'Produto 4',
      descricao: 'Descrição do Produto 4',
      valorUnitario: 40.0,
      urlImg: '/assets/images/produtos/4.png',
    },
    {
      nome: 'Produto 5',
      descricao: 'Descrição do Produto 5',
      valorUnitario: 50.0,
      urlImg: '/assets/images/produtos/5.png',
    },
    {
      nome: 'Produto 6',
      descricao: 'Descrição do Produto 6',
      valorUnitario: 60.0,
      urlImg: '/assets/images/produtos/6.png',
    },
    {
      nome: 'Produto 7',
      descricao: 'Descrição do Produto 7',
      valorUnitario: 70.0,
      urlImg: '/assets/images/produtos/7.png',
    },
    {
      nome: 'Produto 8',
      descricao: 'Descrição do Produto 8',
      valorUnitario: 80.0,
      urlImg: '/assets/images/produtos/8.png',
    },
    {
      nome: 'Produto 9',
      descricao: 'Descrição do Produto 9',
      valorUnitario: 90.0,
      urlImg: '/assets/images/produtos/9.png',
    },
    {
      nome: 'Produto 10',
      descricao: 'Descrição do Produto 10',
      valorUnitario: 100.0,
      urlImg: '/assets/images/produtos/10.png',
    },
  ]);

  db.FormaPagamento.bulkAdd([
    { formaPagamento: 'Cartão de Crédito' },
    { formaPagamento: 'Cartão de Débito' },
    { formaPagamento: 'Dinheiro' },
    { formaPagamento: 'Pix' },
  ]);

  // Adicionar cliente de teste
  db.Cliente.add({
    Nome: 'Usuário Teste',
    email: 'teste@exemplo.com',
    senha: '123',
    logradouro: 'Rua dos Testes',
    numero: '123',
    bairro: 'Bairro Fictício',
    celular: '999999999',
  });
});

export default db;
