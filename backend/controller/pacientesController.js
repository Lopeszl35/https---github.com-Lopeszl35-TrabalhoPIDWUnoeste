const PacientesModel = require('../model/Entities/pacientesModel');
const { validationResult } = require('express-validator');
const pacienteModel = new PacientesModel();

class PacientesController {

    async obterTodos(req, res) {
        console.log('Obtendo todos os Pacientes...');
        try {
            const pacientes = await pacienteModel.obterTodos();
            return res.status(200).json(pacientes);
        } catch (error) {
            console.log('Erro ao obter os Pacientes:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterPorId(req, res) {
        console.log('Obtendo o Paciente por ID...');
        const { id } = req.params;
        try {
            const paciente = await pacienteModel.obterPorId(id);
            return res.status(200).json(paciente);
        } catch (error) {
            console.log('Erro ao obter o Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async adicionar(req, res) {
        console.log('Adicionando o Paciente...');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo } = req.body;
        try {
            const paciente = new PacientesModel(Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo);
            await pacienteModel.adicionar(paciente);
            return res.status(201).json({ message: 'Paciente adicionado com sucesso!' });
        } catch (error) {
            console.error('Erro ao adicionar paciente:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async atualizar(req, res) {
        console.log('Atualizando o Paciente...');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;  
        const { Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo } = req.body;
        try {
            const paciente = new PacientesModel(Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo);
            await pacienteModel.atualizar(id, paciente);
            return res.status(200).json({ message: 'Paciente atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar paciente:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async deletar(req, res) {
        console.log('Deletando o Paciente...');
        const { id } = req.params;
        try {   
            await pacienteModel.deletar(id);    
            return res.status(200).json({ message: 'Paciente deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar paciente:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PacientesController;
