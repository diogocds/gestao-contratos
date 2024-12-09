const pool = require('../../config/conexao');

async function atualizarChecklistControlador (req, res) {
    const { id } = req.params;
    const { risco_pintura, data_inicio, data_fim } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ mensagem: 'O ID é Obrigatorio.' });
        };
    
        if (!risco_pintura) {
            return res.status(400).json({ mensagem: 'O Risco de Pintura é Obrigatorio.' });
        };
    
        if (!data_inicio) {
            return res.status(400).json({ mensagem: 'A Data de Início é Obrigatorio.' });
        };

        if (!data_fim) {
            return res.status(400).json({ mensagem: 'A Data de Fim é Obrigatorio.' });
        };
    
        const resultado = await pool.query(
            'UPDATE checklist SET risco_pintura = $1, data_inicio = $2, data_fim = $3 WHERE  id = $4 RETURNING *',
            [risco_pintura, data_inicio, data_fim ,id]
        );
    
        if(resultado.rowCount === 0){
            return res.status(404).json({ mensagem: 'Checklist não localizado.' })
        };
    
        return res.status(200).json({ mensagem: 'Checklist Atualizado com sucesso.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao atualizar o Checklist' });
    };   
};

module.exports = atualizarChecklistControlador;