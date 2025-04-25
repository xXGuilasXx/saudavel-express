import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cliente from './pages/Cliente';
import Pedido from './pages/Pedido';
import Login from './pages/Login';
import PedidoRealizado from './pages/PedidoRealizado';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ element }) => {
  const loggedUserId = localStorage.getItem("loggedUserId");
  return loggedUserId ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cliente" element={<ProtectedRoute element={<Cliente />} />} />
          <Route path="/pedido" element={<ProtectedRoute element={<Pedido />} />} />
          <Route path="/pedido-realizado" element={<ProtectedRoute element={<PedidoRealizado />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        </Routes>
        
    </Router>
  );
};

export default App;
