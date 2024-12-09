const pool = require('../../config/conexao');

async function atualizarCnhControlador(req, res) {
    const { id } = req.params;
    const {numero, numero_registro, categoria, validade, clientes_id} = req.body;
    
    try {
       
        if (!id) {
            return res.status(400).json({ mensagem: 'O ID é Obrigatorio.' });
        };
        
        if (!numero) {
            return res.status(400).json({ mensagem: 'O Numero é Obrigatorio.' });
        };
    
        if (!numero_registro) {
            return res.status(400).json({ mensagem: 'O Numero de Registro é Obrigatorio.' });
        };
    
        if (!categoria) {
            return res.status(400).json({ mensagem: 'A categoria é Obrigatoria.' });
        };

        if (!validade) {
            return res.status(400).json({ mensagem: 'A validade é Obrigatoria.' });
        };
    
        const resultado = await pool.query(
            'UPDATE cnhs SET (numero, numero_registro, categoria, validade, clientes_id) values ($1, $2, $3, $4, $5) RETURNING *',
            [numero, numero_registro, categoria, validade, clientes_id]
        );
    
        if (resultado.rowCount == 0) {
            return res.status(404).json({ Mensagem: 'CNH não Localizada.' });
        };
    
        return res.status(200).json({ mensagem: 'CNH Atualizada com sucesso.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao atualizar o CNH' });
    }; 

   
};

module.exports = atualizarCnhControlador;