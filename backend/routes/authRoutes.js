// routes/authRoutes.js
const express = require('express');
const { check } = require('express-validator');
const AuthController = require('../controller/authController/authController');
const router = express.Router();

const authController = new AuthController();

// Rota de login
router.post('/login', [
    check('email').isEmail().withMessage('Informe um email válido.'),
    check('senha').notEmpty().withMessage('Senha é obrigatória.')
], authController.login);

module.exports = router;
