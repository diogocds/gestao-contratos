const pool = require('../../config/conexao');

async function criarClienteControlador (req, res)  {
    const { nome, email, cpf, data_nascimento } = req.body;

    try {
        if (!nome) {
            return res.status(400).json({ mensagem: 'O nome é Obrigatorio.' });
        };
    
        if (!email) {
            return res.status(400).json({ mensagem: 'O email é Obrigatoria.' });
        };
    
        if (!cpf) {
            return res.status(400).json({ mensagem: 'A cpf é Obrigatoria.' });
        };
    
        const resultado = await pool.query(
            'insert into clientes (nome, email, cpf, data_nascimento) values ($1, $2, $3, $4) RETURNING *',
            [nome, email, cpf, data_nascimento]
        );
    
        return res.status(201).json(resultado.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao criar o Cliente' });
    };

    
};

module.exports = criarClienteControlador;