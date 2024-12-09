const pool = require('../../config/conexao');

async function atualizarGrupoVeiculo (req, res) {
    const { id } = req.params;
    const { nome, valor } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ mensagem: 'O ID é Obrigatorio.' });
        };
    
        if (!nome) {
            return res.status(400).json({ mensagem: 'O Nome é Obrigatorio.' });
        };
    
        if (!valor) {
            return res.status(400).json({ mensagem: 'O Valor é Obrigatorio.' });
        };
    
        const resultado = await pool.query(
            'UPDATE grupos_veiculos SET nome = $1, valor = $2 WHERE id = $3 RETURNING *',
            [nome, valor, id]
        );
    
        if(resultado.rowCount === 0){
            return res.status(404).json({ mensagem: 'Grupo Veículo não localizado.' })
        };
    
        return res.status(200).json({ mensagem: 'Grupo Veículo Atualizado com sucesso.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao atualizar o Grupo Veículo' });
    };   
};

module.exports = atualizarGrupoVeiculo;