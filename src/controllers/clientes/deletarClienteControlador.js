const pool = require('../../config/conexao');

async function deletarClienteControlador (req, res) {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ mensagem: 'O ID é Obrigatorio.' });
        };
    
        const resultado = await pool.query(
            'DELETE FROM clientes WHERE id = $1 RETURNING *',
            [id]
        );
    
        if (resultado.rowCount == 0) {
            return res.status(404).json({ Mensagem: 'Cliente não Localizado.' });
        };
    
        return res.status(200).json({ Mensagem: 'Cliente excluido com sucesso.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao deletar o Cliente' });
    };
    
};


module.exports = deletarClienteControlador;