import { Navigate } from "react-router-dom";

function Pedido() {
  const numeroPedido = 1000;

  const handleConfirm = () => {
    return <Navigate to="/pedido-realizado" />;
  };

  return (
    <div>
      <h1>Pedido N{numeroPedido}</h1>
      <p>Faça seu pedido!</p>
      <h2>Lista de Produtos</h2>
      <ul>
        <li>Produto 1</li>
        <li>Produto 2</li>
        <li>Produto 3</li>
        <li>Produto 4</li>
        <li>Produto 5</li>
        <li>Produto 6</li>
      </ul>
      <button onClick={handleConfirm}>Confirmar Pedido</button>
    </div>
  );
}
export default Pedido;
// Compare this snippet from src/pages/Produto.jsx: