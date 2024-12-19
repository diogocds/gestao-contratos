const pool = require("../../config/conexao");

const listarTipoUsuarioController = async (req, res) => {
  try {
    const tipoUsuario = await pool.query(
      "SELECT * FROM tipo_usuario ORDER BY descricao"
    );

    // Retorna a lista de tipos de Usuários
    return res.status(200).json(tipoUsuario.rows);

  } catch (err) {
    console.error("Erro ao listar Tipo do Usuário:", err.message);
    return res.status(500).json({ message: "Erro ao listar Tipo do Usuário" });
  };
};

module.exports = {
  listarTipoUsuarioController,
};
