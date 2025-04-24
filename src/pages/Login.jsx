import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { executeQuery, runQuery } from '../services/database';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const rows = executeQuery(
            'SELECT * FROM usuarios WHERE usuario = ? AND senha = ?',
            [usuario, senha]
        );
        if (rows.length > 0) {
            navigate('/pedidos');
        } else {
            alert('Usuário ou senha inválidos');
        }
    };

    const handleCadastro = () => {
        runQuery(
            'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
            [usuario, senha]
        );
        alert('Usuário cadastrado com sucesso!');
    };

    return (
        <div className="login-container max-w-full flex flex-col text-center bg-gray-300 p-4 rounded shadow-lg">
            <h2 className='text-3xl text-gray-800 p-4'>Login</h2>
            <input
                className='mb-2 bg-gray-100 p-2 rounded'
                type="text"
                placeholder="Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <input
                className='mb-2 bg-gray-100 p-2 rounded'
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <button className='mb-2 bg-blue-500 text-white p-2 rounded' onClick={handleLogin}>Entrar</button>
            <button className='mb-2 bg-green-500 text-white p-2 rounded' onClick={handleCadastro}>Cadastrar</button>
        </div>
    );
};

export default Login;
