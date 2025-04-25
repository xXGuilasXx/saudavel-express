
function Dashboard() {

  const cliente = "Cliente";
  
  return (
    <div>
      <h1>Olá, {cliente}</h1>
      <p>Esta é a página de clientes.</p>
      <button>Fazer novo pedido</button>
      <h2>Lista de Pedidos</h2>
      <ul>
        <li>dados do pedido 1</li>
        <li>dados do pedido 2</li>
        <li>dados do pedido 3</li>
        <li>dados do pedido 4</li>
      </ul>
      <button>Sair</button>
    </div>
  );
}
export default Dashboard;