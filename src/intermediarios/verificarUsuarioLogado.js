const jwt = require('jsonwebtoken');
require('dotenv').config();

const senhaJwt = process.env.JWT_SECRET;

const verificarUsuarioLogado = (req, res, next) => {
    const { authorization } = req.headers;
    // console.log(authorization);

    if(!authorization) {
        return res.status(401).json({ mensagem: 'Usuário não autorizado.' })
    }

    // const token1 = authorization.split(' ');
    const token = authorization.split(' ')[1];

    // console.log(token1);
    console.log(token);

    try {
        const tokenUsuario = jwt.verify(token, senhaJwt);

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }


};

module.exports = verificarUsuarioLogado;