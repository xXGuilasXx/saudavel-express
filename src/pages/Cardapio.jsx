import React, { useEffect, useState } from 'react';
import { executeQuery } from '../database';

const Cardapio = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const produtos = executeQuery('SELECT * FROM produtos');
            setProdutos(produtos);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Cardápio</h2>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id} className="mb-2">
                        <strong>{produto.nome}</strong>: {produto.descricao} - R$ {produto.preco.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cardapio;