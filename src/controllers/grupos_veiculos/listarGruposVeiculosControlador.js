const pool = require('../../config/conexao');

async function listarGruposVeiculos (req, res) {
    
    try {
        const resultado = await pool.query(
            'SELECT * FROM grupos_veiculos ORDER BY id ASC'
        );
    
        return res.status(200).json(resultado.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao listar Grupos Veículos' });
    };
};

module.exports = listarGruposVeiculos;