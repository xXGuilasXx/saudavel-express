import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { styled } from "@mui/system";
import db from "../database/db";

// Estilização personalizada
const StyledCard = styled(Card)({
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
});

const StyledButton = styled(Button)({
  borderRadius: "20px",
  fontWeight: "bold",
});

const AddButton = styled(IconButton)({
  backgroundColor: "#4caf50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#45a049",
  },
});

const RemoveButton = styled(IconButton)({
  backgroundColor: "#f44336",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#e53935",
  },
});

const StyledBox = styled(Box)({
  backgroundColor: "#e8f5e9",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
});

const StyledTypography = styled(Typography)({
  color: "#388e3c",
  fontWeight: "bold",
});

function Pedido() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState("");
  const frete = 10;

  useEffect(() => {
    const fetchProdutos = async () => {
      const produtosDb = await db.Produto.toArray();
      setProdutos(produtosDb);
      const initialQuantidades = produtosDb.reduce((acc, produto) => {
        acc[produto.idProduto] = 0;
        return acc;
      }, {});
      setQuantidades(initialQuantidades);
    };
    fetchProdutos();
  }, []);

  useEffect(() => {
    const fetchFormasPagamento = async () => {
      const formas = await db.FormaPagamento.toArray();
      setFormasPagamento(formas);
    };
    fetchFormasPagamento();
  }, []);

  const handleQuantidadeChange = (idProduto, delta) => {
    setQuantidades((prev) => {
      const novaQuantidade = Math.max(
        0,
        Math.min(10, (prev[idProduto] || 0) + delta)
      );
      const novoSubtotal =
        subtotal +
        delta * produtos.find((produto) => produto.idProduto === idProduto).valorUnitario;
      setSubtotal(novoSubtotal);
      return { ...prev, [idProduto]: novaQuantidade };
    });
  };

  const handleConfirmarPedido = async () => {
    const loggedUserId = localStorage.getItem("loggedUserId");
    if (!loggedUserId) {
      navigate("/login");
      return;
    }

    const formaPagamento = formasPagamento.find(
      (forma) => forma.idFormaPagamento === formaPagamentoSelecionada
    );

    const pedido = {
      idCliente: Number(loggedUserId), // Usa o ID do cliente logado
      idProdutos: Object.entries(quantidades)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, quantidade]) => quantidade > 0)
        .map(([idProduto, quantidade]) => ({
          idProduto: Number(idProduto),
          quantidade,
        })),
      valorTotalPedido: subtotal + frete,
      idFormaPagamento: formaPagamentoSelecionada,
      descricaoFormaPagamento: formaPagamento?.formaPagamento || "N/A",
    };
    await db.Pedido.add(pedido);
    navigate("/pedido-realizado", { state: { pedido, produtos } });
  };

  return (
    <StyledBox p={2}>
      <StyledTypography variant="h4" textAlign="center" gutterBottom>
        Pedido
      </StyledTypography>
      <Grid container spacing={4} sx={{
        margin: 1,
        alignContent: "center !important",
        alignItems: "center !important", justifyContent: "center",
        display: "flex !important"
      }}
      >
        {produtos.map((produto) => (
          <Grid item xs={12} sm={6} md={4} key={produto.idProduto}>
            <StyledCard >
              <CardContent sx={{ textAlign: "center", padding: 5 }}>
                <Typography variant="h6" color="primary">
                  {produto.nome}
                </Typography>
                <Box
                  className="rounded-lg overflow-hidden"
                  style={{
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f1f8e9",
                  }}
                >
                  <img
                    src={new URL(`../assets/images/produtos/${produto.idProduto}.png`, import.meta.url).href}
                    alt={produto.nome}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Typography>{produto.descricao}</Typography>
                <Typography>Valor Unitário: R${produto.valorUnitario.toFixed(2)}</Typography>
                <Typography>
                  Total: R$
                  {(produto.valorUnitario * (quantidades[produto.idProduto] || 0)).toFixed(2)}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <RemoveButton
                    onClick={() => handleQuantidadeChange(produto.idProduto, -1)}
                    disabled={(quantidades[produto.idProduto] || 0) === 0}
                  >
                    <Remove />
                  </RemoveButton>
                  <Typography mx={2}>{quantidades[produto.idProduto] || 0}</Typography>
                  <AddButton
                    onClick={() => handleQuantidadeChange(produto.idProduto, 1)}
                    disabled={(quantidades[produto.idProduto] || 0) === 10}
                  >
                    <Add />
                  </AddButton>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <StyledTypography variant="h5">Resumo do Pedido</StyledTypography>
        <Typography>Subtotal: R${subtotal.toFixed(2)}</Typography>
        <Typography>Frete: R${frete.toFixed(2)}</Typography>
        <Typography>Total: R${(subtotal + frete).toFixed(2)}</Typography>
        <Divider sx={{ my: 2 }} />
        <FormControl fullWidth>
          <InputLabel id="forma-pagamento-label">Forma de Pagamento</InputLabel>
          <Select
            labelId="forma-pagamento-label"
            value={formaPagamentoSelecionada}
            onChange={(e) => setFormaPagamentoSelecionada(e.target.value)}
          >
            {formasPagamento.map((forma) => (
              <MenuItem key={forma.idFormaPagamento} value={forma.idFormaPagamento}>
                {forma.formaPagamento}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={2} display="flex" justifyContent="space-between">
          <StyledButton
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/dashboard")}
            sx={{ backgroundColor: "#f44336", color: "#fff" }}
          >
            Cancelar
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleConfirmarPedido}
            disabled={subtotal === 0}
          >
            Confirmar Pedido
          </StyledButton>
        </Box>
      </Box>
    </StyledBox>
  );
}

export default Pedido;