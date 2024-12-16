const pool = require('../../config/conexao');

async function deletarCnhControlador (req, res) {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ mensagem: 'O ID é Obrigatorio.' });
        };
    
        const resultado = await pool.query(
            'DELETE FROM cnhs WHERE id = $1 RETURNING *',
            [id]
        );
    
        if (resultado.rowCount == 0) {
            return res.status(404).json({ Mensagem: 'CNH não Localizada.' });
        };
    
        return res.status(200).json({ Mensagem: 'CNH excluida com sucesso.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao deletar o CNH' });
    };
    
    
};



module.exports = deletarCnhControlador;