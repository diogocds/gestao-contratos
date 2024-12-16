const pool = require("../../config/conexao");
const path = require("path");

// Rota para a página cadastrar orientações
const cadastrarGruposVeiculosWeb = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../public/admin/admin_grupos_veiculos",
      "cadastroGruposVeiculos.html"
    )
  );
};

// Cadastrar Grupos Veículos
async function cadastrarGrupoVeiculoController(req, res) {
  const { nome, descricao } = req.body;

  try {
    if (!nome) {
      return res.status(400).json({ mensagem: "O Nome é Obrigatorio." });
    }

    if (!descricao) {
      return res.status(400).json({ mensagem: "A Descricao é Obrigatoria." });
    }

    const resultado = await pool.query(
      "INSERT INTO grupos_veiculos (nome, descricao) values ($1, $2) RETURNING *",
      [nome, descricao]
    );

    return res.status(201).json(resultado.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ mensagem: "Erro ao Cadastrar Grupo do Veiculo" });
  }
}

module.exports = {
  cadastrarGruposVeiculosWeb,
  cadastrarGrupoVeiculoController,
};
