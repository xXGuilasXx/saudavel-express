import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton, // Adicionado
  Modal,      // Adicionado
  Backdrop,   // Adicionado
  Fade,       // Adicionado
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; // Adicionado
import db from "../database/db";

// Estilo para o Modal
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

function Dashboard() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({});
  const [pedidos, setPedidos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // Estado para o modal
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState(null); // Estado para o pedido a ser excluído

  useEffect(() => {
    const fetchClienteEPedidos = async () => {
      const loggedUserId = localStorage.getItem("loggedUserId");
      if (!loggedUserId) {
        navigate("/login");
        return;
      }
      const clienteLogado = await db.Cliente.get(Number(loggedUserId));
      setCliente(clienteLogado || {});
      if (clienteLogado) {
        const pedidosCliente = await db.Pedido.where("idCliente")
          .equals(clienteLogado.idCliente)
          .reverse() // Para mostrar os mais recentes primeiro
          .sortBy("idPedido");
        setPedidos(pedidosCliente.reverse()); // Reverte novamente para manter a ordem decrescente após sortBy
      }
    };
    fetchClienteEPedidos();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedUserId");
    navigate("/login");
  };

  const handleAbrirModal = (pedido) => {
    setPedidoParaExcluir(pedido);
    setModalOpen(true);
  };

  const handleFecharModal = () => {
    setModalOpen(false);
    setPedidoParaExcluir(null);
  };

  const handleConfirmarExclusao = async () => {
    if (pedidoParaExcluir) {
      try {
        await db.Pedido.delete(pedidoParaExcluir.idPedido);
        setPedidos(pedidos.filter(p => p.idPedido !== pedidoParaExcluir.idPedido));
        alert(`Pedido N° ${pedidoParaExcluir.idPedido} excluído com sucesso!`);
      } catch (error) {
        console.error("Erro ao excluir pedido:", error);
        alert("Erro ao excluir pedido. Tente novamente.");
      }
      handleFecharModal();
    }
  };

  return (
    <Box className="p-4 bg-gray-100 min-h-screen">
      <Typography variant="h4" textAlign="center" className="text-gray-800 p-4">
        Olá, {cliente.Nome || "Cliente"}
      </Typography>
      <Divider className="my-4" />
      <Box textAlign="center" className="mb-6">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/pedido")}
          className="bg-green-500 hover:bg-green-600 mt-2"
          sx={{
            padding: "10px 20px", fontSize: "16px", fontWeight: "bold",
            marginTop: "10px", backgroundColor: "green",
            "&:hover": { backgroundColor: "darkgreen" },
            color: "white", borderRadius: "8px",
            transition: "background-color 0.3s ease",
            "&:active": { backgroundColor: "white", color: "green" }
          }}
        >
          Fazer novo pedido
        </Button>
      </Box>
      <Divider className="my-4" />
      <Typography variant="h5" className="text-gray-800 mb-4 text-center" sx={{ fontWeight: "bold", margin: "20px 0" }}>
        Histórico de Pedidos
      </Typography>
      <List className="bg-white shadow rounded-lg">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <ListItem
              key={pedido.idPedido}
              className="border-b last:border-b-0"
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleAbrirModal(pedido)}
                  sx={{ color: 'red' }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
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
          sx={{
            padding: "10px 20px", fontSize: "16px", fontWeight: "bold",
            marginTop: "10px", borderColor: "red",
            "&:hover": { backgroundColor: "red", color: "white" },
            color: "red", borderRadius: "8px",
            transition: "background-color 0.3s ease",
            "&:active": { backgroundColor: "white", color: "red" }
          }}
        >
          Sair
        </Button>
      </Box>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        open={modalOpen}
        onClose={handleFecharModal}
        aria-labelledby="modal-excluir-title"
        aria-describedby="modal-excluir-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, // Fundo escurecido opaco
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={styleModal}>
            <Typography id="modal-excluir-title" variant="h6" component="h2">
              Confirmar Exclusão do Pedido
            </Typography>
            {pedidoParaExcluir && (
              <Box id="modal-excluir-description" sx={{ mt: 2 }}>
                <Typography>
                  <strong>Pedido N°:</strong> {pedidoParaExcluir.idPedido}
                </Typography>
                <Typography>
                  <strong>Valor Total:</strong> R${pedidoParaExcluir.valorTotalPedido.toFixed(2)}
                </Typography>
                <Typography>
                  <strong>Forma de Pagamento:</strong> {pedidoParaExcluir.descricaoFormaPagamento}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Você tem certeza que deseja excluir este pedido? Esta ação não poderá ser desfeita.
                </Typography>
              </Box>
            )}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleFecharModal} sx={{ mr: 1 }}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmarExclusao} variant="contained" color="error">
                Confirmar Exclusão
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

export default Dashboard;