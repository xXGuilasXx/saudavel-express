import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const produtos = [
    { id: 1, nome: 'Salada Caesar', descricao: 'Salada com molho Caesar', preco: 15.0 },
    { id: 2, nome: 'Wrap de Frango', descricao: 'Wrap recheado com frango', preco: 12.0 },
    // ...mais produtos...
];

const Pedidos = () => {
    const [quantidades, setQuantidades] = useState({});
    const navigate = useNavigate();

    const handleQuantidade = (id, delta) => {
        setQuantidades(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta),
        }));
    };

    const fazerPedido = () => {
        const resumo = produtos
            .filter(produto => quantidades[produto.id] > 0)
            .map(produto => ({
                ...produto,
                quantidade: quantidades[produto.id],
                total: quantidades[produto.id] * produto.preco,
            }));
        navigate('/pedido-realizado', { state: { resumo } });
    };

    return (
        <div>
            <h2>Faça seu Pedido</h2>
            {produtos.map(produto => (
                <div key={produto.id} className="produto-card">
                    <h3>{produto.nome}</h3>
                    <p>{produto.descricao}</p>
                    <p>R$ {produto.preco.toFixed(2)}</p>
                    <button onClick={() => handleQuantidade(produto.id, -1)}>-</button>
                    <span>{quantidades[produto.id] || 0}</span>
                    <button onClick={() => handleQuantidade(produto.id, 1)}>+</button>
                </div>
            ))}
            <button onClick={fazerPedido}>Fazer Pedido</button>
        </div>
    );
};

export default Pedidos;