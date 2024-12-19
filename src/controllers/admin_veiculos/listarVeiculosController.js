const pool = require("../../config/conexao");
const path = require("path");

// Rota para a página Listar Veículos
const listarVeiculosWeb = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/admin/admin_view_veiculos", "listarVeiculos.html"));
};

const listarVeiculosController = async (req, res) => {
  try {
    const veiculos = await pool.query(
      "SELECT * FROM veiculos ORDER BY modelo"
    );

    // Retorna a lista dos veiculos
    return res.status(200).json(veiculos.rows);

  } catch (err) {
    console.error("Erro ao listar Veículos.", err.message);
    return res.status(500).json({ message: "Erro ao listar Veículos." });
  }
};

module.exports = {
  listarVeiculosWeb,
  listarVeiculosController
};
