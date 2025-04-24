import React from 'react';
import { useLocation } from 'react-router-dom';

const PedidoRealizado = () => {
    const { state } = useLocation();
    const resumo = state?.resumo || [];

    const totalGeral = resumo.reduce((acc, item) => acc + item.total, 0);

    return (
        <div>
            <h2>Pedido Realizado com Sucesso!</h2>
            <ul>
                {resumo.map(item => (
                    <li key={item.id}>
                        {item.nome} - Quantidade: {item.quantidade} - Unitário: R$ {item.preco.toFixed(2)} - Total: R$ {item.total.toFixed(2)}
                    </li>
                ))}
            </ul>
            <h3>Total Geral: R$ {totalGeral.toFixed(2)}</h3>
        </div>
    );
};

export default PedidoRealizado;
