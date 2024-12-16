const pool = require('../../config/conexao');

async function obterUmaCnhControlador (req, res) {
    const { id } = req.params;

    try {
        const resultado = await pool.query(
            'SELECT * FROM cnhs WHERE id = $1',
            [id]
        );
    
    
        if (resultado.rows == 0) {
            return res.status(404).json({ Mensagem: 'CNH não Localizada.' });
        };
    
        return res.status(200).json(resultado.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao obter o CNH' });
    };
   
};

module.exports = obterUmaCnhControlador;