import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import db from "../database/db";

function PedidoRealizado() {
  const { state } = useLocation();
  const navigate = useNavigate(); // Adicionar useNavigate
  const { pedido, produtos } = state || {};
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    const fetchCliente = async () => {
      const clienteLogado = await db.Cliente.get(pedido?.idCliente);
      setCliente(clienteLogado || {});
    };
    fetchCliente();
  }, [pedido]);

  const produtosPedido = pedido?.idProdutos.map((item) => {
    const produto = produtos.find((p) => p.idProduto === item.idProduto);
    return { ...produto, quantidade: item.quantidade };
  });

  return (
    <Box p={2}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Pedido N° {pedido?.idPedido || "N/A"}
      </Typography>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Seu pedido foi realizado com sucesso!
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5">Lista de Produtos</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Valor Unitário</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {produtosPedido?.map((produto) => (
            <TableRow key={produto.idProduto}>
              <TableCell>{produto.nome}</TableCell>
              <TableCell>{produto.quantidade}</TableCell>
              <TableCell>R${produto.valorUnitario.toFixed(2)}</TableCell>
              <TableCell>R${(produto.valorUnitario * produto.quantidade).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5">Resumo do Pedido</Typography>
      <Typography>Subtotal: R${pedido?.valorTotalPedido - 10 || 0}</Typography>
      <Typography>Frete: R$10,00</Typography>
      <Typography>Total: R${pedido?.valorTotalPedido || 0}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5">Informações de Pagamento</Typography>
      <Typography>
        Forma de pagamento: {pedido?.descricaoFormaPagamento || "N/A"}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5">Dados do Cliente</Typography>
      <Typography>Nome: {cliente.Nome || "N/A"}</Typography>
      <Typography>Celular: {cliente.celular || "N/A"}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5">Informações de Entrega</Typography>
      <Typography>Endereço: {cliente.logradouro || "N/A"}, {cliente.numero || "N/A"}</Typography>
      <Typography>Bairro: {cliente.bairro || "N/A"}</Typography>
      <Typography>Celular: {cliente.celular || "N/A"}</Typography>
      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/dashboard")} // Alterar para usar navigate
      >
        Voltar para a página inicial
      </Button>
    </Box>
  );
}

export default PedidoRealizado;