const pool = require('../../config/conexao');

async function atualizarUsuarioControlador (req, res) {
    const { id } = req.params;
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
       
        const resultado = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
            [nome, email, senha, id]
        );
    
        if(resultado.rowCount === 0){
            return res.status(404).json({ mensagem: 'Usuário não localizado.' })
        }
    
        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
    };   
};

module.exports = atualizarUsuarioControlador;