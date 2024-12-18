const express = require("express");

// MODELO
const {
  cadastroUsuarioController,
  cadastroUsuarioWeb,
} = require("../controllers/admin_usuarios/cadastroUsuarioController");

const {
  listarTipoUsuarioController,
} = require("../controllers/admin_usuarios/listarTipoUsuarioController");
const {
  cadastrarGruposVeiculosWeb,
  cadastrarGrupoVeiculoController,
  cadastrarGruposVeiculosController,
} = require("../controllers/admin_grupos_veiculos/cadastrarGruposVeiculosController");

const {
  listarUsuariosController,
  listarUsuarioWeb,
} = require("../controllers/admin_usuarios/listarUsuarioController");

const {
  deletarUsuarioController,
  deletarUsuarioWeb,
} = require("../controllers/admin_usuarios/deletarUsuarioController");
const rotas = express();

const {
  cadastrarVeiculosWeb,
  cadastrarVeiculoController,
} = require("../controllers/admin_veiculos/cadastrarVeiculosController");

const { listarGruposVeiculosController, listarGruposVeiculosWeb } = require("../controllers/admin_grupos_veiculos/listarGruposVeiculosController");

// MODELO





const deletarGruposVeiculosController = require("../controllers/admin_grupos_veiculos/deletarGruposVeiculosControlador");



// MODELO
// Usuarios - Rotas para páginas HTML do Admin
rotas.get("/admin/usuarios/criar", cadastroUsuarioWeb);
rotas.get("/admin/usuarios/listar", listarUsuarioWeb);
rotas.get("/admin/usuarios/deletar", deletarUsuarioWeb);

// Rotas Grupos Veiculos - Ok
rotas.get("/admin/grupos_veiculos/criar", cadastrarGruposVeiculosWeb);
rotas.get("/admin/grupos_veiculos/listar", listarGruposVeiculosWeb);
rotas.post("/admin/grupos_veiculos", cadastrarGruposVeiculosController);
rotas.get("/admin/grupos_veiculos", listarGruposVeiculosController);
rotas.delete("/admin/grupos_veiculos/:id", deletarGruposVeiculosController);

// Rotas Web - OK
rotas.get("/admin/veiculos/criar", cadastrarVeiculosWeb);

// Rotas Controladores OK
rotas.post("/admin/veiculos/criar", cadastrarVeiculoController);

rotas.post("/usuarios", cadastroUsuarioController);
rotas.get("/admin/tipo_usuarios", listarTipoUsuarioController);
rotas.get("/admin/listar_usuarios", listarUsuariosController);

rotas.delete("/admin/deletar_usuario/:id", deletarUsuarioController);
// MODELO

// Rotas Cnhs
// rotas.get("/cnhs", listarCnhControlador);
// rotas.get("/cnhs/:id", obterUmaCnhControlador);
// rotas.put("/cnhs/:id", atualizarCnhControlador);
// rotas.post("/cnhs", criarCnhControlador);
// rotas.delete("/cnhs/:id", deletarCnhControlador);

// Rotas Contratos
// rotas.get("/contratos", listarContratoControlador);
// rotas.get("/contratos/:id", obterUmContratoControlador);
// rotas.put("/contratos/:id", atualizarContratoControlador);
// rotas.post("/contratos", criarContratoControlador);
// rotas.delete("/contratos/:id", deletarContratoControlador);


   // rotas.use(verificarUsuarioLogado);

// Rotas Checklists
// rotas.get("/checklists", listarChecklistsControlador);
// rotas.get("/checklists/:id", obterUmChecklistControlador);
// rotas.put("/checklists/:id", atualizarChecklistControlador);
// rotas.post("/checklists", criarChecklistControlador);
// rotas.delete("/checklists/:id", deletarChecklistControlador);

module.exports = rotas;
