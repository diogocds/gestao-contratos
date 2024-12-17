const { log } = require("console");
const pool = require("../../config/conexao");
const path = require("path");

const deletarUsuarioWeb = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../public/admin/admin_view_usuarios",
      "listarUsuario.html"
    )
  );
};
const deletarUsuarioController = async (req, res) => {
  const { id } = req.params;
  try {
  
    const result = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({ message: "Usuário excluído com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  } catch (err) {
    console.error("Erro ao excluir usuário:", err);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};

module.exports = {
  deletarUsuarioController,
  deletarUsuarioWeb,
};
