# Saudável Express - Sistema de Gestão de Delivery de Alimentos Saudáveis

Este projeto é um sistema web desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas da Universidade do Vale do Itajaí (UNIVALI). Ele foi idealizado para atender microempreendedores individuais (MEIs) que trabalham com delivery de refeições saudáveis.

## Objetivo

Facilitar a divulgação dos produtos, o gerenciamento de pedidos e pagamentos online, permitindo ao empreendedor administrar o negócio de forma eficiente, prática e segura.

## Tecnologias Utilizadas

- **Frontend:** React.js + Vite
- **Estilização:** TailwindCSS + Material UI (MUI)
- **Banco de Dados:** IndexedDB (via Dexie.js)
- **Outras libs:** Better-SQLite3 (offline), React Router DOM para navegação
- **Ambiente de Desenvolvimento:** ESLint configurado para React

## Funcionalidades

- Cadastro e login de clientes
- Visualização e edição de perfil
- Listagem e escolha de produtos
- Escolha da forma de pagamento
- Finalização de pedido
- Dashboard com histórico de pedidos
- Autenticação simples baseada em LocalStorage

## Como Rodar o Projeto

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse no navegador: [http://localhost:5173](http://localhost:5173)

## Equipe

- Juliano Boaventura Fialho - [juliano.8333009@edu.univali.br](mailto:juliano.8333009@edu.univali.br)
- Guilherme Amaral Cardoso - [gui.a.cardoso@edu.univali.br](mailto:gui.a.cardoso@edu.univali.br)
- Francis Nunes Toledo - [francis.8324247@edu.univali.br](mailto:francis.8324247@edu.univali.br)

## Observações

- O sistema foi projetado para fins acadêmicos e uso não comercial.
- Algumas funções, como integração de pagamento real, estão simuladas para fins de demonstração.
