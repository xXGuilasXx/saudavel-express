import initSqlJs from 'sql.js';

let db;

export const initializeDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: (file) => `/node_modules/sql.js/dist/${file}`, // Localiza o arquivo .wasm
  });
  db = new SQL.Database();

  // Criação das tabelas
  db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT NOT NULL,
      senha TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT NOT NULL,
      resumo TEXT NOT NULL
    );
  `);
};

export const executeQuery = (query, params = []) => {
  const stmt = db.prepare(query);
  stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
};

export const runQuery = (query, params = []) => {
  db.run(query, params);
};
