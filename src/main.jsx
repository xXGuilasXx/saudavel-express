// Padrão do Vite para main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import db from './database/db'; // Importar o db

// Função para garantir que o usuário de teste exista
async function ensureTestUser() {
  const testUserEmail = 'teste@exemplo.com';
  try {
    const existingUser = await db.Cliente.where('email').equals(testUserEmail).first();
    if (!existingUser) {
      await db.Cliente.add({
        Nome: 'Usuário Teste',
        email: testUserEmail,
        senha: '123', // Lembre-se que senhas em plain text não são seguras para produção real
        logradouro: 'Rua dos Testes',
        numero: '123',
        bairro: 'Bairro Fictício',
        celular: '999999999',
      });
      console.log('Usuário de teste criado em main.jsx.');
    } else {
      console.log('Usuário de teste já existe (verificado em main.jsx).');
    }
  } catch (error) {
    // Tratar o caso de o populate já ter tentado adicionar e dado erro de constraint,
    // ou outros erros ao interagir com o DB.
    if (error.name === 'ConstraintError') {
      console.log('Usuário de teste já existe (ConstraintError ao tentar adicionar em main.jsx).');
    } else {
      console.error('Erro ao verificar/criar usuário de teste em main.jsx:', error);
    }
  }
}

// Chamar a função e então renderizar o App
ensureTestUser().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(error => {
  console.error("Erro na inicialização do ensureTestUser:", error);
  // Fallback para renderizar o app mesmo se houver erro com o usuário de teste
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
