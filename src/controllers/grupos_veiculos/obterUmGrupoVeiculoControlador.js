const pool = require('../../config/conexao');

async function obterUmGrupoVeiculo (req, res) {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            'SELECT * FROM grupos_veiculos WHERE id = $1',
            [id]
        );
    
        if (resultado.rowCount === 0) {
            return res.status(404).json({ Mensagem: 'O Grupo Veículo não foi Localizado.' });
        }
    
        return res.status(200).json(resultado.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao obter Grupo Veiculo' });
    };
};

module.exports = obterUmGrupoVeiculo;