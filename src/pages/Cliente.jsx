import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import db from "../database/db";

function Cliente() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const fetchCliente = async () => {
      const clienteLogado = await db.Cliente.toCollection().first(); // Simula cliente logado
      setCliente(clienteLogado || {});
    };
    fetchCliente();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
    setIsModified(true);
  };

  const handleSave = async () => {
    await db.Cliente.update(cliente.idCliente, cliente);
    alert("Dados atualizados com sucesso!");
    setIsEditing(false);
    setIsModified(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ maxWidth: 500, width: "100%", padding: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Cliente
          </Typography>
          <form>
            <TextField
              label="Nome"
              name="Nome"
              fullWidth
              margin="normal"
              value={cliente.Nome || ""}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditing }}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              value={cliente.email || ""}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditing }}
            />
            <TextField
              label="Logradouro"
              name="logradouro"
              fullWidth
              margin="normal"
              value={cliente.logradouro || ""}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditing }}
            />
            <TextField
              label="Número"
              name="numero"
              fullWidth
              margin="normal"
              value={cliente.numero || ""}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditing }}
            />
            <TextField
              label="Bairro"
              name="bairro"
              fullWidth
              margin="normal"
              value={cliente.bairro || ""}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditing }}
            />
            <TextField
              label="Celular"
              name="celular"
              fullWidth
              margin="normal"
              value={cliente.celular || ""}
              onChange={handleInputChange}
              InputProps={{ readOnly: !isEditing }}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!isModified}
                  >
                    Salvar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate("/dashboard")}
                  >
                    Voltar para Dashboard
                  </Button>
                </>
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Cliente;