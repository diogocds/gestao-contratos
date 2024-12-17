const pool = require("../../config/conexao");
const path = require("path");

const listarGruposVeiculosController = async (req, res) => {
  try {
    const tipoUsuario = await pool.query(
      "SELECT * FROM grupos_veiculos ORDER BY nome"
    );

    // Retorna a lista dos grupos de veiculos
    return res.status(200).json(tipoUsuario.rows);
  } catch (err) {
    console.error("Erro ao listar o Grupo do Veículo.", err.message);
    return res.status(500).json({ message: "Erro ao listar o Grupo do Veículo." });
  }
};

module.exports = {
    listarGruposVeiculosController,
};
