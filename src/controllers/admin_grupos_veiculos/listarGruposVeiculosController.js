const pool = require("../../config/conexao");
const path = require("path");

// Rota para a página Listar Usuarios
const listarGruposVeiculosWeb = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../public/admin/admin_grupos_veiculos",
      "listarGruposVeiculos.html"
    )
  );
};

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
  listarGruposVeiculosWeb,
  listarGruposVeiculosController
};
