import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Typography, List, ListItem, ListItemText } from "@mui/material";
import db from "../database/db";

function Dashboard() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({});
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchClienteEPedidos = async () => {
      const clienteLogado = await db.Cliente.toCollection().first(); // Simula cliente logado
      setCliente(clienteLogado || {});
      if (clienteLogado) {
        const pedidosCliente = await db.Pedido.where("idCliente").equals(clienteLogado.idCliente).toArray();
        setPedidos(pedidosCliente);
      }
    };
    fetchClienteEPedidos();
  }, []);

  const handleLogout = () => {
    // Simula logout
    navigate("/login");
  };

  return (
    <Box className="p-4 bg-gray-100 min-h-screen">
      <Typography variant="h4" textAlign="center" className="text-gray-800 mb-4">
        Olá, {cliente.Nome || "Cliente"}
      </Typography>
      <Divider className="my-4" />
      <Box textAlign="center" className="mb-6">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/pedido")}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Fazer novo pedido
        </Button>
      </Box>
      <Divider className="my-4" />
      <Typography variant="h5" className="text-gray-800 mb-2">
        Histórico de Pedidos
      </Typography>
      <List className="bg-white shadow rounded-lg">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <ListItem key={pedido.idPedido} className="border-b last:border-b-0">
              <ListItemText
                primary={`Pedido #${pedido.idPedido}`}
                secondary={`Total: R$${pedido.valorTotalPedido.toFixed(2)} - Forma de Pagamento: ${pedido.descricaoFormaPagamento}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography className="text-gray-600 text-center p-4">
            Nenhum pedido encontrado.
          </Typography>
        )}
      </List>
      <Divider className="my-4" />
      <Box textAlign="center" className="mt-6">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          className="border-red-500 text-red-500 hover:bg-red-100"
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;