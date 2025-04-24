import React, { useEffect, useState } from 'react';
import { executeQuery, runQuery } from '../database';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const clientes = executeQuery('SELECT * FROM clientes');
        setClientes(clientes);
    }, []);

    const adicionarCliente = () => {
        if (nome && email) {
            runQuery('INSERT INTO clientes (nome, email) VALUES (?, ?)', [nome, email]);
            setClientes([...clientes, { id: clientes.length + 1, nome, email }]);
            setNome('');
            setEmail('');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Clientes</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={adicionarCliente} className="bg-blue-500 text-white p-2">Adicionar</button>
            </div>
            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.id}>{cliente.nome} - {cliente.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Clientes;