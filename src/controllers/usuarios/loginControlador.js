const pool = require('../../config/conexao');
const bcrypt = require('bcrypt');
require('dotenv').config();

const senhaJwt = process.env.JWT_SECRET;

async function logarUsuarioControlador (req, res) {
    const { email, senha } = req.body;

    try {
    
        if (!email) {
            return res.status(400).json({ mensagem: 'O E-mail é Obrigatorio.' });
        };
    
        if (!senha) {
            return res.status(400).json({ mensagem: 'A Senha é Obrigatoria.' });
        };

        const resultadoBd = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );


        if (resultadoBd.rowCount === 0) {
            return res.status(404).json({ Mensagem: 'Usuário ou Senha inválidos.' });
        }

        const resultado = await bcrypt.compare(senha, resultadoBd.rows[0].senha)

        console.log(senhaJwt);

        if (resultado) {
            const token = jwt.sign({ nome: 'Diogo' }, senhaJwt, { expiresIn: '1m'} );
            return res.status(200).json({ token });
        }

        return res.status(200).json({ mensagem: 'Usuário ou Senha inválidos.'});
    
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ mensagem: 'Erro ao logar usuário' });
    };
    
};

module.exports = logarUsuarioControlador;