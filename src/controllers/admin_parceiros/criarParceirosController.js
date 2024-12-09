const pool = require('../../config/conexao');
const path = require('path');
const bcrypt = require('bcrypt');



// Rota para a página criar Parceiros
const criarParceirosWeb = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/admin_view_parceiros', 'criar_parceiros.html'));
};




// Rota para criar um novo Parceiro
const criarParceirosController = async (req, res) => {
    const { nome, email, senha, tipo_pessoa, rg, cpf, cnpj, inscricao_estadual, inscricao_municipal, nome_fantasia, descricao, categoria_id, latitude, longitude, categoria_usuario_id, logradouro, numero, cep, bairro, municipio_id, telefones, site, facebook, instagram, twitter } = req.body;
    const { horarios } = req.body;
    const arquivos = req.files;

    if (!nome || !nome.trim()) {
        return res.status(400).json({ message: 'O campo Nome é obrigatório.' });
    };

    if (!email || !email.trim()) {
        return res.status(400).json({ message: 'O campo E-mail é obrigatório.' });
    };

    if (!senha || !senha.trim()) {
        return res.status(400).json({ message: 'O campo Senha é obrigatório.' });
    };

    if (!cep || !cep.trim()) {
        return res.status(400).json({ message: 'O campo CEP é obrigatório.' });
    };  

    if (!arquivos || arquivos.length === 0) {
        return res.status(400).send('Nenhum arquivo enviado.');
    }

    
    // Verificar se os dados de horários foram enviados
    if (!horarios || typeof horarios !== 'object') {
        return res.status(400).json({ error: 'Dados incompletos. Envie os horários de forma correta.' });
    }

    // Distribuir os horários para os dias selecionados
    const horariosDistribuidos = distribuirHorarios(horarios);

    // Validar se os horários estão no formato correto
    if (!horariosDistribuidos.every(horario => validarHorario(horario.horarioAbertura) && validarHorario(horario.horarioFechamento))) {
        return res.status(400).json({ error: 'Formato de horário inválido. Use o formato HH:MM.' });
    }

    try {
        // Iniciar uma transação
        await pool.query('BEGIN');

        const senhaEncriptada = await bcrypt.hash(senha, 10);

        // Inserir o usuário na tabela "usuarios" e obter o ID gerado
        const novoUsuario = await pool.query(
            'INSERT INTO usuarios (nome, email, senha, categoria_usuario_id, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id',
            [nome, email, senhaEncriptada, categoria_usuario_id]
        );

        const usuarios_id = novoUsuario.rows[0].id;

        // Inserir o endereço na tabela "enderecos", associando-o ao ID do usuário
        await pool.query(
            'INSERT INTO enderecos (logradouro, numero, cep, bairro, municipio_id, usuarios_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())',
            [logradouro, numero, cep, bairro, municipio_id, usuarios_id]
        );

        // Inserir cada telefone na tabela "telefones", associando-os ao ID do usuário
        if (Array.isArray(telefones)) {
            for (const telefone of telefones) {
                await pool.query(
                    'INSERT INTO telefones (numero, usuarios_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())',
                    [telefone, usuarios_id]
                );
            }
        } else {
            await pool.query(
                'INSERT INTO telefones (telefone, usuarios_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())',
                [telefones, usuarios_id]
            );
        }
       
        // Confirmar a transação
        await pool.query('COMMIT');

        // Redirecionar para a página do formulário com uma query string para indicar sucesso
        return res.redirect('/admin/parceiros/criar?success=true');

    } catch (err) {
        // Reverter a transação em caso de erro
        await pool.query('ROLLBACK');
        console.error('Erro ao criar Parceiro e Endereço:', err.message);
        return res.status(500).json({ message: 'Erro ao criar Parceiro e Endereço.' });
    }
};

module.exports = {
    criarParceirosWeb,
    criarParceirosController
};
