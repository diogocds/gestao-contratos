const pool = require('../../config/conexao');

async function criarVeiculoControlador (req, res) {
    const { modelo, placa, ano, grupos_veiculos_id } = req.body;

    console.log(grupos_veiculos_id);

    try {
        if (!modelo) {
            return res.status(400).json({ mensagem: 'O Modelo é Obrigatorio.' });
        };
    
        if (!placa) {
            return res.status(400).json({ mensagem: 'A Placa é Obrigatoria.' });
        };

        if (!ano) {
            return res.status(400).json({ mensagem: 'O Ano é Obrigatorio.' });
        };

        if (!grupos_veiculos_id) {
            return res.status(400).json({ mensagem: 'O grupos_veiculos_id é Obrigatorio.' });
        };

        const resultado = await pool.query(
            'INSERT INTO veiculos (modelo, placa, ano, grupos_veiculos_id) values ($1, $2, $3, $4) RETURNING *',
            [modelo, placa, ano, grupos_veiculos_id]
        );
    
        return res.status(201).json(resultado.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao criar Veiculo' });
    };
    
};

module.exports = criarVeiculoControlador;