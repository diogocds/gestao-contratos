const pool = require("../../config/conexao");
const path = require("path");

// Rota para a página Listar Usuarios
const listarUsuarioWeb = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../public/admin/admin_view_usuarios",
      "listarUsuario.html"
    )
  );
};

async function listarUsuariosController(req, res) {
  try {
    const usuario = await pool.query("SELECT * FROM usuarios ORDER BY id ASC");
    res.json(usuario.rows);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).send("Erro ao listar usuários");
  }
}

module.exports = {
  listarUsuariosController,
  listarUsuarioWeb,
};
