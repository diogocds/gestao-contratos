const pool = require('../../config/conexao');

async function atualizarVeiculoControlador (req, res) {
    const { id } = req.params;
    const { modelo, placa, ano } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ mensagem: 'O ID é Obrigatorio.' });
        };
    
        if (!modelo) {
            return res.status(400).json({ mensagem: 'O Modelo é Obrigatorio.' });
        };
    
        if (!placa) {
            return res.status(400).json({ mensagem: 'A Placa é Obrigatoria.' });
        };

        if (!ano) {
            return res.status(400).json({ mensagem: 'O Ano é Obrigatorio.' });
        };

    
        const resultado = await pool.query(
            'UPDATE veiculos SET modelo = $1, placa = $2, ano = $3  WHERE id = $4 RETURNING *',
            [modelo, placa, ano, id]
        );
    
        if(resultado.rowCount === 0){
            return res.status(404).json({ mensagem: 'Veículo não localizado.' })
        };
    
        return res.status(200).json({ mensagem: 'Veículo Atualizado com sucesso.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao atualizar o Veículo' });
    };   
};

module.exports = atualizarVeiculoControlador;