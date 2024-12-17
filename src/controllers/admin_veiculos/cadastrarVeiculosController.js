const pool = require("../../config/conexao");
const path = require("path");

// Rota para a página cadastrar orientações
const cadastrarVeiculosWeb = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../public/admin/admin_veiculos",
      "cadastroVeiculos.html"
    )
  );
};

// Cadastrar Grupos Veículos
async function cadastrarVeiculoController(req, res) {
  const { modelo, placa, ano, marca, cor } = req.body;

  try {

    if (!modelo) {
      return res.status(400).json({ mensagem: 'O Modelo é Obrigatorio.' });
  };

  if (!placa) {
      return res.status(400).json({ mensagem: 'A Placa é Obrigatoria.' });
  };

  if (!ano) {
      return res.status(400).json({ mensagem: 'O Ano é Obrigatorio.' });
  };

  if (!marca) {
    return res.status(400).json({ mensagem: 'A Marca é Obrigatorio.' });
};
if (!cor) {
  return res.status(400).json({ mensagem: 'A Cor é Obrigatorio.' });
};


    const resultado = await pool.query(
      "INSERT INTO veiculos ( modelo, placa, ano, marca, cor) values ($1, $2, $3, $4, $5) RETURNING *",
      [modelo, placa, ano, marca, cor]
    );

    return res.status(201).json(resultado.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ mensagem: "Erro ao Criar Veiculo" });
  }
}

module.exports = {
  cadastrarVeiculosWeb,
  cadastrarVeiculoController,
};