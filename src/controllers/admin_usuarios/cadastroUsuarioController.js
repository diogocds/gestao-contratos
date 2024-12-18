const pool = require("../../config/conexao");
const path = require("path");
const bcrypt = require("bcrypt");

// Rota para a página criar Parceiros
const cadastroUsuarioWeb = (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../public/admin/admin_view_usuarios",
      "cadastroUsuario.html"
    )
  );
};

// Rota para criar um novo Usuário
const cadastroUsuarioController = async (req, res) => {
  const {
    nome,
    email,
    senha,
    tipo_usuario_id,
    rg,
    cpf,
    data_nascimento,
    cep,
    logradouro,
    numero,
    bairro,
    telefones,
  } = req.body;
  const arquivos = req.files;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ message: "O campo Nome é obrigatório." });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ message: "O campo E-mail é obrigatório." });
  }

  if (!senha || !senha.trim()) {
    return res.status(400).json({ message: "O campo Senha é obrigatório." });
  }

  if (!cep || !cep.trim()) {
    return res.status(400).json({ message: "O campo CEP é obrigatório." });
  }

  // if (!arquivos || arquivos.length === 0) {
  //   return res.status(400).send("Nenhum arquivo enviado.");
  // }

  try {
    const senhaEncriptada = await bcrypt.hash(senha, 10);

    // Inserir o usuário na tabela "usuarios" e obter o ID gerado
    const novoUsuario = await pool.query(
      "INSERT INTO usuarios (nome, email, senha, tipo_usuario_id, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id",
      [nome, email, senhaEncriptada, tipo_usuario_id]
    );
    const usuario_id = novoUsuario.rows[0].id;

    // Inserir o endereço na tabela "enderecos", associando-o ao ID do usuário
    await pool.query(
      "INSERT INTO enderecos (logradouro, numero, cep, bairro, usuario_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())",
      [logradouro, numero, cep, bairro, usuario_id]
    );
    await pool.query(
      "INSERT INTO documentos (cpf, rg, data_nascimento, usuario_id, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())",
      [cpf, rg, data_nascimento, usuario_id]
    );

    // Inserir cada telefone na tabela "telefones", associando-os ao ID do usuário
    if (Array.isArray(telefones)) {
      for (const telefone of telefones) {
        await pool.query(
          "INSERT INTO telefones (numero, usuario_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())",
          [telefone, usuario_id]
        );
      }
    } else {
      await pool.query(
        "INSERT INTO telefones (telefone, usuario_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())",
        [telefones, usuario_id]
      );
    }

    // Confirmar a transação
    await pool.query("COMMIT");

    // Redirecionar para a página do formulário com uma query string para indicar sucesso
    return res.redirect("/admin/usuarios/criar?success=true");
  } catch (err) {
    // Reverter a transação em caso de erro
    await pool.query("ROLLBACK");
    console.error("Erro ao criar Parceiro e Endereço:", err.message);
    return res
      .status(500)
      .json({ message: "Erro ao criar Parceiro e Endereço." });
  }
};

module.exports = {
  cadastroUsuarioController,
  cadastroUsuarioWeb,
};
