import React, { useState } from 'react';

const CadastroProduto = () => {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');

    const adicionarProduto = () => {
        if (nome && descricao && preco) {
            const novoProduto = { id: produtos.length + 1, nome, descricao, preco: parseFloat(preco) };
            setProdutos([...produtos, novoProduto]);
            setNome('');
            setDescricao('');
            setPreco('');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Cadastro de Produto</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    className="border p-2 mr-2"
                />
                <button onClick={adicionarProduto} className="bg-blue-500 text-white p-2">Adicionar</button>
            </div>
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

export default CadastroProduto;