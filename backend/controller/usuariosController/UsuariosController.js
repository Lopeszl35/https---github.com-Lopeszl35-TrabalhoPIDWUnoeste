const ProfissionaisModel = require('../model/Entities/profissionaisModel');
const UsuariosModel = require('../model/Entities/usuariosModel');
const { validationResult } = require('express-validator');
const DataBase = require('../model/database');

const usuarioModel = new UsuariosModel();
const dataBase = new DataBase();

class UsuariosController {

}

module.exports = UsuariosController;
