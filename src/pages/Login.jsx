import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Card,
    CardContent,
    Link,
} from "@mui/material";
import db from "../database/db";

const Login = () => {
    const navigate = useNavigate();
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [formData, setFormData] = useState({
        Nome: "",
        email: "",
        senha: "",
        logradouro: "",
        numero: "",
        bairro: "",
        celular: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, senha } = formData;

        const user = await db.Cliente.where({ email, senha }).first();
        if (user) {
            console.log("Usuário autenticado com sucesso!");
            navigate("/dashboard");
        } else {
            alert("Falha na autenticação. Tente novamente.");
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        await db.Cliente.add(formData);
        alert("Conta criada com sucesso!");
        setIsCreatingAccount(false);
        setFormData({
            Nome: "",
            email: "",
            senha: "",
            logradouro: "",
            numero: "",
            bairro: "",
            celular: "",
        });
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Card sx={{ maxWidth: 400, width: "100%", padding: 2 }}>
                <CardContent>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        {isCreatingAccount ? "Criar Conta" : "Login"}
                    </Typography>
                    <form
                        onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin}
                    >
                        {isCreatingAccount && (
                            <>
                                <TextField
                                    label="Nome"
                                    name="Nome"
                                    fullWidth
                                    margin="normal"
                                    value={formData.Nome}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    label="Logradouro"
                                    name="logradouro"
                                    fullWidth
                                    margin="normal"
                                    value={formData.logradouro}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    label="Número"
                                    name="numero"
                                    fullWidth
                                    margin="normal"
                                    value={formData.numero}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    label="Bairro"
                                    name="bairro"
                                    fullWidth
                                    margin="normal"
                                    value={formData.bairro}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    label="Celular"
                                    name="celular"
                                    fullWidth
                                    margin="normal"
                                    value={formData.celular}
                                    onChange={handleInputChange}
                                    required
                                />
                            </>
                        )}
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            label="Senha"
                            name="senha"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={formData.senha}
                            onChange={handleInputChange}
                            required
                        />
                        <Box mt={2} display="flex" justifyContent="space-between">
                            {isCreatingAccount ? (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setIsCreatingAccount(false)}
                                    >
                                        Cancelar
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    Entrar
                                </Button>
                            )}
                        </Box>
                    </form>
                    {!isCreatingAccount && (
                        <Typography mt={2} textAlign="center">
                            Não tem conta?{" "}
                            <Link
                                component="button"
                                onClick={() => setIsCreatingAccount(true)}
                            >
                                Criar uma conta
                            </Link>
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;