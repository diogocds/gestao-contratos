const pool = require('../../config/conexao');

async function criarChecklistControlador (req, res) {
    const { risco_pintura, data_inicio, data_fim, veiculos_id } = req.body;

    try {
        if (!risco_pintura) {
            return res.status(400).json({ mensagem: 'O Risco de Pintura é Obrigatorio.' });
        };
    
        if (!data_inicio) {
            return res.status(400).json({ mensagem: 'A Data de Início é Obrigatorio' });
        };

        if (!data_fim) {
            return res.status(400).json({ mensagem: 'A Data de Fim é Obrigatorio.' });
        };

        if (!veiculos_id) {
            return res.status(400).json({ mensagem: 'O veiculos_id é Obrigatorio.' });
        };

        const resultado = await pool.query(
            'INSERT INTO checklist (risco_pintura, data_inicio, data_fim, veiculos_id) values ($1, $2, $3, $4) RETURNING *',
            [risco_pintura, data_inicio, data_fim, veiculos_id]
        );
    
        return res.status(201).json(resultado.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao criar o Checklist' });
    };
    
};

module.exports = criarChecklistControlador;