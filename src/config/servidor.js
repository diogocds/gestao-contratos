const express = require("express");
const path = require("path");
const rotas = require("../routes/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rotas);

// Middleware para servir outros arquivos estáticos, se necessário
app.use(express.static(path.join(__dirname, "../public")));

app.all("*", (req, res) => {
  return res.status(404).json({
    mensagem: "Verifique se o endereço da página foi digitado corretamente.",
  });
});

module.exports = app;
