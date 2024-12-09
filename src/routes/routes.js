const express = require("express");

// MODELO
const {
  cadastroFuncionarioController,
  cadastroFuncionarioWeb,
} = require("../controllers/admin_parceiros/cadastroFuncionarioController");
const {
  cadastroUsuarioController,
  cadastroUsuarioWeb,
} = require("../controllers/admin_parceiros/cadastroUsuarioController");
// MODELO

const listarClienteControlador = require("../controllers/clientes/listarClienteControlador");
const obterUmClinteControlador = require("../controllers/clientes/obterUmClienteControlador");
const atualizarClienteControlador = require("../controllers/clientes/atualizarClienteControlador");
const criarClienteControlador = require("../controllers/clientes/criarClienteControlador");
const deletarClienteControlador = require("../controllers/clientes/deletarClienteControlador");

const atualizarCnhControlador = require("../controllers/cnhs/atualizarCnhControlador");
const criarCnhControlador = require("../controllers/cnhs/criarCnhControlador");
const deletarCnhControlador = require("../controllers/cnhs/deletarCnhControlador");
const listarCnhControlador = require("../controllers/cnhs/listarCnhControlador");
const obterUmaCnhControlador = require("../controllers/cnhs/obterUmaCnhControlador");

const atualizarContratoControlador = require("../controllers/contratos/atualizarContratoControlador");
const criarContratoControlador = require("../controllers/contratos/criarContratoControlador");
const deletarContratoControlador = require("../controllers/contratos/deletarContratoControlador");
const listarContratoControlador = require("../controllers/contratos/listarContratoControlador");
const obterUmContratoControlador = require("../controllers/contratos/obterUmContratoControlador");

const listarUsuarioControlador = require("../controllers/usuarios/listarUsuarioControlador");
const obterUmUsuarioControlador = require("../controllers/usuarios/obterUmUsuarioControlador");
const atualizarUsuarioControlador = require("../controllers/usuarios/atualizarUsuarioControlador");
const criarUsuarioControlador = require("../controllers/usuarios/criarUsuarioControlador");
const deletarUsuarioControlador = require("../controllers/usuarios/deletarUsuarioControlador");

const listarGruposVeiculos = require("../controllers/grupos_veiculos/listarGruposVeiculosControlador");
const obterUmGrupoVeiculo = require("../controllers/grupos_veiculos/obterUmGrupoVeiculoControlador");
const atualizarGrupoVeiculo = require("../controllers/grupos_veiculos/atualizarGrupoVeiculoControlador");
const criarGrupoVeiculo = require("../controllers/grupos_veiculos/criarGrupoVeiculoControlador");
const deletarGrupoVeiculo = require("../controllers/grupos_veiculos/deletarGrupoVeiculoControlador");

const obterUmVeiculoControlador = require("../controllers/veiculos/obterUmVeiculoControlador");
const atualizarVeiculoControlador = require("../controllers/veiculos/atualizarVeiculoControlador");
const criarVeiculoControlador = require("../controllers/veiculos/criarVeiculoControlador");
const deletarVeiculoControlador = require("../controllers/veiculos/deletarVeiculoControlador");
const listarVeiculosControlador = require("../controllers/veiculos/listarVeiculosControlador");

const listarChecklistsControlador = require("../controllers/checklist/listarChecklistsControlador");
const obterUmChecklistControlador = require("../controllers/checklist/obterUmChecklistControlador");
const atualizarChecklistControlador = require("../controllers/checklist/atualizarChecklistControlador");
const criarChecklistControlador = require("../controllers/checklist/criarChecklistControlador");
const deletarChecklistControlador = require("../controllers/checklist/deletarChecklistControlador");
const logarUsuarioControlador = require("../controllers/usuarios/loginControlador");
const verificarUsuarioLogado = require("../intermediarios/verificarUsuarioLogado");
const {
  listarTipoUsuarioController,
} = require("../controllers/admin_parceiros/listarTipoUsuario");

const rotas = express();

// MODELO
// Parceiros - Rotas para páginas HTML do Admin
rotas.get("/admin/parceiros/criar", cadastroUsuarioWeb);
rotas.get("/admin/parceiros/listar", cadastroFuncionarioWeb);
rotas.get("/admin/tipo_usuarios", listarTipoUsuarioController);

// Rotas para Usuarios
rotas.post("/parceiros", cadastroUsuarioController);
rotas.get("/parceiros", cadastroFuncionarioController);
// MODELO

// Rotas Clientes
rotas.get("/clientes", listarClienteControlador);
rotas.get("/clientes/:id", obterUmClinteControlador);
rotas.put("/clientes/:id", atualizarClienteControlador);
rotas.post("/clientes", criarClienteControlador);
rotas.delete("/clientes/:id", deletarClienteControlador);

// Rotas Cnhs
rotas.get("/cnhs", listarCnhControlador);
rotas.get("/cnhs/:id", obterUmaCnhControlador);
rotas.put("/cnhs/:id", atualizarCnhControlador);
rotas.post("/cnhs", criarCnhControlador);
rotas.delete("/cnhs/:id", deletarCnhControlador);

// Rotas Contratos
rotas.get("/contratos", listarContratoControlador);
rotas.get("/contratos/:id", obterUmContratoControlador);
rotas.put("/contratos/:id", atualizarContratoControlador);
rotas.post("/contratos", criarContratoControlador);
rotas.delete("/contratos/:id", deletarContratoControlador);

// Rotas Usuários
rotas.get("/usuarios", listarUsuarioControlador);
rotas.get("/usuarios/:id", obterUmUsuarioControlador);
rotas.put("/usuarios/:id", atualizarUsuarioControlador);
rotas.post("/usuarios", criarUsuarioControlador);
rotas.delete("/usuarios/:id", deletarUsuarioControlador);
rotas.post("/login", logarUsuarioControlador);
rotas.post("/usuarios/teste", verificarUsuarioLogado);

// Rotas Grupo veiculos
rotas.get("/grupoveiculos", listarGruposVeiculos);
rotas.get("/grupoveiculos/:id", obterUmGrupoVeiculo);
rotas.put("/grupoveiculos/:id", atualizarGrupoVeiculo);
rotas.post("/grupoveiculos", criarGrupoVeiculo);
rotas.delete("/grupoveiculos/:id", deletarGrupoVeiculo);

// Rotas Veiculos
rotas.get("/veiculos", listarVeiculosControlador);
rotas.get("/veiculos/:id", obterUmVeiculoControlador);
rotas.put("/veiculos/:id", atualizarVeiculoControlador);
rotas.post("/veiculos", criarVeiculoControlador);
rotas.delete("/veiculos/:id", deletarVeiculoControlador);

// rotas.use(verificarUsuarioLogado);

// Rotas Checklists
rotas.get("/checklists", listarChecklistsControlador);
rotas.get("/checklists/:id", obterUmChecklistControlador);
rotas.put("/checklists/:id", atualizarChecklistControlador);
rotas.post("/checklists", criarChecklistControlador);
rotas.delete("/checklists/:id", deletarChecklistControlador);

module.exports = rotas;
