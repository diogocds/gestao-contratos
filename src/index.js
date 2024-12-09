const app = require('../src/config/servidor');

// Apenas inicia o servidor se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
  });
}

module.exports = app;