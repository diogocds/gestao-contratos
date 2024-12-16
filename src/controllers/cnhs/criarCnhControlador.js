const pool = require('../../config/conexao');

async function criarCnhControlador(req, res) {
    const { numero, numero_registro, categoria, validade, clientes_id } = req.body;
    
    try {
        const resultado = await pool.query(
            'insert into cnhs (numero, numero_registro, categoria, validade, clientes_id) values ($1, $2, $3, $4, $5) RETURNING *',
            [numero, numero_registro, categoria, validade, clientes_id]
        );
  
      return res.status(201).json(resultado.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao criar CNH' });
    };
  };

  module.exports = criarCnhControlador;