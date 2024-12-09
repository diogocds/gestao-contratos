const pool = require('../../config/conexao');

async function listarUsuarioControlador (req, res) {
    
    try {
        const resultado = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    
        return res.status(200).json(resultado.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao listar usuarios' });
    };
};

module.exports = listarUsuarioControlador;