const pool = require('../../config/conexao');

async function criarContratoControlador (req, res)  {
    const { clausulas, data_inicio, data_retorno, data_fim, ativo, clientes_id, veiculos_id, checklist_id } = req.body;
    

    try {
        if (!clausulas) {
            return res.status(400).json({ mensagem: 'A Clausula é Obrigatoria.' });
        };
    
        if (!data_inicio) {
            return res.status(400).json({ mensagem: 'A Data de Inicio é Obrigatoria.' });
        };
    
        if (!data_retorno) {
            return res.status(400).json({ mensagem: 'A Data de Retorno é Obrigatoria.' });
        };
        if (!ativo) {
            return res.status(400).json({ mensagem: 'Status do Contrato é Obrigatorio.' });
        };
    
        const resultado = await pool.query(
            'insert into contratos (clausulas, data_inicio, data_retorno, data_fim, ativo, clientes_id, veiculos_id, checklist_id ) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [clausulas, data_inicio, data_retorno, data_fim, ativo, clientes_id, veiculos_id, checklist_id ]
        );
    
        return res.status(201).json(resultado.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao criar o Contrato.' });
    };

    
};

module.exports = criarContratoControlador;