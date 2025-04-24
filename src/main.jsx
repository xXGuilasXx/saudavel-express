import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initializeDatabase } from './services/database';

const startApp = async () => {
  await initializeDatabase(); // Inicializa o banco de dados
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

startApp(); // Inicia o aplicativo após a inicialização do banco
