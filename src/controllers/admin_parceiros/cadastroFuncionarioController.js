const pool = require('../../config/conexao');
const path = require('path');

// Rota para a página cadastrar orientações
const cadastroFuncionarioWeb = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/admin_view_usuarios', 'cadastroFuncionario.html'));
};

// Obter todas as categorias
const cadastroFuncionarioController = async (req, res) => { 
  try {
    const categorias = await pool.query(
      'SELECT * FROM pontos_turisticos ORDER BY nome'
    );

    res.status(200).json(categorias.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ mensagem: 'Erro ao buscar categorias' });
  }
};

module.exports = {
  cadastroFuncionarioWeb,
  cadastroFuncionarioController
}