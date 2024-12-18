const pool = require('../../config/conexao');

async function criarGrupoVeiculo (req, res) {
    const { nome, valor } = req.body;

    try {
        if (!nome) {
            return res.status(400).json({ mensagem: 'O Nome é Obrigatorio.' });
        };
    
        if (!valor) {
            return res.status(400).json({ mensagem: 'O Valor é Obrigatorio.' });
        };

        const resultado = await pool.query(
            'INSERT INTO grupos_veiculos (nome, descricao) values ($1, $2) RETURNING *',
            [nome, valor]
        );
    
        return res.status(201).json(resultado.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao criar Grupo Veiculo' });
    };
    
};

module.exports = criarGrupoVeiculo;