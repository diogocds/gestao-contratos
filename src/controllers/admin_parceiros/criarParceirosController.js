const pool = require('../../config/conexao');
const path = require('path');

// Rota para carregar a página do formulário
const criarParceirosWeb = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/admin_view_parceiros', 'criar_parceiros.html'));
};

// Rota para criar uma nova categoria de ponto turístico
const criarParceirosController = async (req, res) => {
  const { nome, descricao, latitude, longitude, seguranca, duracao, atividade, codigo_municipio, categoria_id } = req.body;

  if (!nome || !nome.trim()) {
      return res.status(400).json({ message: 'O campo Nome é obrigatório.' });
  }

  if (!descricao || !descricao.trim()) {
      return res.status(400).json({ message: 'O campo Descrição é obrigatório.' });
  }

  if (!latitude || !latitude.trim()) {
    return res.status(400).json({ message: 'O campo Latitude é obrigatório.' });
  }

  if (!longitude || !longitude.trim()) {
    return res.status(400).json({ message: 'O campo Longitude é obrigatório.' });
  }

  if (!seguranca || !seguranca.trim()) {
    return res.status(400).json({ message: 'O campo Segurança é obrigatório.' });
  }

  if (!duracao || !duracao.trim()) {
    return res.status(400).json({ message: 'O campo Duração é obrigatório.' });
  }

  if (!atividade || !atividade.trim()) {
    return res.status(400).json({ message: 'O campo Atividade é obrigatório.' });
  }

  if (!categoria_id || !categoria_id.trim()) {
    return res.status(400).json({ message: 'O campo Categoria é obrigatório.' });
  }

  try {
      // Inserir nova categoria no banco de dados
      const novaCategoria = await pool.query(
        'INSERT INTO pontos_turisticos (nome, descricao, latitude, longitude, seguranca, duracao, atividade, codigo_municipio, categoria_pontos_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *',
        [nome, descricao, latitude, longitude, seguranca, duracao, atividade, codigo_municipio, categoria_id]
      );
    

      // Redirecionar para a página do formulário com uma query string para indicar sucesso
      return res.redirect('/admin/pontos-turisticos/criar?success=true');

  } catch (err) {
      console.error('Erro ao criar Ponto turístico:', err.message);
      return res.status(500).json({ message: 'Erro ao criar Ponto turístico.' });
  }
};

module.exports = {
    criarParceirosWeb,
    criarParceirosController
};
