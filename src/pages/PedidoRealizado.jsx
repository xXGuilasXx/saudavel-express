function PedidoRealizado() {
  const numeroPedido = 123456; // Exemplo de número do pedido, você pode obter isso de uma API ou estado global
  return (
    <div>
      <h1>Pedido N{numeroPedido}</h1>
      <p>Seu pedido foi realizado com sucesso!</p>
      <h2>Lista de Produtos</h2>
      <ul>
        <li>Produto 1</li>
        <li>Produto 2</li>
        <li>Produto 3</li>
        <li>Produto 4</li>
        <li>Produto 5</li>
        <li>Produto 6</li>
      </ul>
      <h2>Resumo do Pedido</h2>
      <p>Subtotal: R$ 100,00</p>
      <p>Frete: R$ 10,00</p>
      <p>Total: R$ 110,00</p>
      <h2>Informações de Entrega</h2>
      <p>Endereço: Rua Exemplo, 123</p>
      <p>Cidade: Exemplo</p>
      <p>Bairro: Exemplo</p>
      <h2>Informações de Pagamento</h2>
      <p>Forma de pagamento: Cartão de Crédito</p>
      <button onClick={() => window.location.href = '/cliente'}>Voltar para a página inicial</button>
      <p>Obrigado por comprar conosco!</p>
      <p>Se precisar de ajuda, entre em contato com nosso suporte.</p>
      <p>Você pode acompanhar o status do seu pedido na sua conta.</p>
    </div>
  );
}
export default PedidoRealizado;