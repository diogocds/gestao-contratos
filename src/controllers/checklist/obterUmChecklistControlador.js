const pool = require('../../config/conexao');

async function obterUmChecklistControlador (req, res) {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            'SELECT * FROM checklist WHERE id = $1',
            [id]
        );
    
        if (resultado.rowCount === 0) {
            return res.status(404).json({ Mensagem: 'O Checklist não foi Localizado.' });
        };
    
        return res.status(200).json(resultado.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao obter Checklist' });
    };
};

module.exports = obterUmChecklistControlador;