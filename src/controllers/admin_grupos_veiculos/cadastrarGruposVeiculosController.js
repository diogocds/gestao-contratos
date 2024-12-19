const pool = require("../../config/conexao");
const path = require("path");

// Rota para a página Cadastrar Grupos Veículos
const cadastrarGruposVeiculosWeb = (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/admin/admin_view_grupos_veiculos", "cadastroGruposVeiculos.html"));
};

// Cadastrar Grupos Veículos
async function cadastrarGruposVeiculosController(req, res) {
  const { nome, descricao } = req.body;

  try {
    if (!nome) {
      return res.status(400).json({ mensagem: "O Nome é Obrigatorio." });
    }

    if (!descricao) {
      return res.status(400).json({ mensagem: "A Descrição é Obrigatoria." });
    }

    const resultado = await pool.query(
      "INSERT INTO grupos_veiculos (nome, descricao) values ($1, $2) RETURNING *",
      [nome, descricao]
    );

    // Redirecionar para a página do formulário com uma query string para indicar sucesso
    return res.redirect("/admin/grupos_veiculos/criar?success=true");

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ mensagem: "Erro ao Cadastrar Grupo do Veiculo" });
  }
}

module.exports = {
  cadastrarGruposVeiculosWeb,
  cadastrarGruposVeiculosController,
};
