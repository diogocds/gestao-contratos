const pool = require('../../config/conexao');
const bcrypt = require('bcrypt');


async function criarUsuarioControlador (req, res) {
    const { nome, email, senha } = req.body;

    try {
        if (!nome) {
            return res.status(400).json({ mensagem: 'O Nome é Obrigatorio.' });
        };
    
        if (!email) {
            return res.status(400).json({ mensagem: 'O E-mail é Obrigatorio.' });
        };
    
        if (!senha) {
            return res.status(400).json({ mensagem: 'A Senha é Obrigatoria.' });
        };

        const senhaEncriptada = await bcrypt.hash(senha, 10)
        console.log(senhaEncriptada);
    
        const resultado = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) values ($1, $2, $3) RETURNING *',
            [nome, email, senhaEncriptada]
        );
    
        return res.status(201).json(resultado.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao criar usuário' });
    };
    
};

module.exports = criarUsuarioControlador;