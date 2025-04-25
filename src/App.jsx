import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cliente from './pages/Cliente';
import Pedido from './pages/Pedido';
import Login from './pages/Login';
import PedidoRealizado from './pages/PedidoRealizado';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="p-4 flex flex-col items-center bg-gray-200 min-h-screen">
        <h1 className="text-3xl text-gray-800 p-4">Delivery Saudável</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/pedido-realizado" element={<PedidoRealizado />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
