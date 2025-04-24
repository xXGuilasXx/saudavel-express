import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Cardapio from './pages/Cardapio';
import Pedidos from './pages/Pedidos';
import CadastroProduto from './pages/CadastroProduto';
import Login from './pages/Login';
import PedidoRealizado from './pages/PedidoRealizado';

const App = () => {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="p-4 flex flex-col items-center bg-gray-200 min-h-screen">
        <h1 className="text-3xl text-gray-800 p-4">Gestão de Delivery Saudável</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/cadastro-produto" element={<CadastroProduto />} />
          <Route path="/pedido-realizado" element={<PedidoRealizado />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
