const pool = require('../../config/conexao');

async function atualizarClienteControlador(req, res) {
    const { id } = req.params;
    const { nome, email, cpf, data_nascimento } = req.body;
    
    try {
        if (!id) {
            return res.status(400).json({ mensagem: 'O ID é Obrigatorio.' });
        };
    
        if (!nome) {
            return res.status(400).json({ mensagem: 'O Nome é Obrigatorio.' });
        };
    
        if (!email) {
            return res.status(400).json({ mensagem: 'O E-mail é Obrigatorio.' });
        };
    
        if (!cpf) {
            return res.status(400).json({ mensagem: 'O cpf é Obrigatorio.' });
        };
    
        const resultado = await pool.query(
            'UPDATE clientes SET titulo = $1, email = $2, cpf = $3, data_nascimento = $4 WHERE id = $5 RETURNING *',
            [nome, email, cpf, id, data_nascimento]
        );
    
        if (resultado.rowCount == 0) {
            return res.status(404).json({ Mensagem: 'Cliente não Localizado.' });
        };
    
        return res.status(200).json({ mensagem: 'Cliente Atualizado com sucesso.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao atualizar o Cliente' });
    }; 

   
};

module.exports = atualizarClienteControlador;