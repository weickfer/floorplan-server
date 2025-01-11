import knex from 'knex'
import config from './knexfile.js'

// Configure o knex com a configuração do seu banco de dados (conforme o knexfile)
const db = knex(config);

async function runMigrations() {
  try {
    console.log('Iniciando migrações...');
    await db.migrate.latest();
    console.log('Migrações concluídas com sucesso!');
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
    process.exit(1); // Finaliza o processo com erro
  } finally {
    db.destroy(); // Fecha a conexão com o banco
  }
}

runMigrations();