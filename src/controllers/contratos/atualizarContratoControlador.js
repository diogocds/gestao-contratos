const pool = require('../../config/conexao');

async function atualizarContratoControlador(req, res) {
    const { id } = req.params;
    const { clausulas, data_inicio, data_retorno, data_fim, ativo, clientes_id, veiculos_id, checklist_id } = req.body;
    
    try {
        if (!id) {
            return res.status(400).json({ mensagem: 'O ID é Obrigatorio.' });
        };
    
        if (!clausulas) {
            return res.status(400).json({ mensagem: 'A clausula é Obrigatoria.' });
        };
    
        if (!data_inicio) {
            return res.status(400).json({ mensagem: 'A Data é Obrigatoria.' });
        };
    
        if (!data_retorno) {
            return res.status(400).json({ mensagem: 'A Data de Retorno é Obrigatoria.' });
        };
    
        const resultado = await pool.query(
            'UPDATE contratos SET clausulas = $1, data_inicio = $2, data_retorno = $3, data_fim = $4, ativo = $5, clientes_id = $6, veiculos_id = $7, checklist_id = $8 WHERE id = $9 RETURNING *',
            [clausulas, data_inicio, data_retorno, id, data_fim, ativo, clientes_id, veiculos_id, checklist_id]
        );
    
        if (resultado.rowCount == 0) {
            return res.status(404).json({ Mensagem: 'Contrato não Localizado.' });
        };
    
        return res.status(200).json({ mensagem: 'Contrato Atualizado com sucesso.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao atualizar o Contrato.' });
    }; 

   
};

module.exports = atualizarContratoControlador;