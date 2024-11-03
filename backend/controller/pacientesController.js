const PacientesModel = require('../model/Entities/pacientesModel/pacientesModel');
const ResponsaveisModel = require('../model/Entities/pacientesModel/responsaveisModel');
const EnderecosModel = require('../model/Entities/pacientesModel/enderecosModel');
const { validationResult } = require('express-validator');
const DataBase = require('../model/database');
const AbstractAgendamentoController = require('./abstratos/AbstractAgendamentoController');

const pacienteModel = new PacientesModel();
const responsavelModel = new ResponsaveisModel();
const enderecoModel = new EnderecosModel();
const dataBase = new DataBase();

class PacientesController extends AbstractAgendamentoController {
    constructor(pacientesService) {
        super();
        this.pacientesService = pacientesService;
    }

    async obterPacientes(req, res) {
        console.log('Obtendo todos os Pacientes...');
        try {
            const paciente = await this.pacientesService.obterPacientes();
            return res.status(200).json(paciente);
        } catch (error) {
            console.log('Erro ao obter os Pacientes:', error);
            return res.status(500).json({ message: error.message });
        }
    }


    async buscarUltimoPaciente(req, res) {
        console.log('Buscando o último Paciente...');
        try {
            const paciente = await pacienteModel.buscarUltimoPaciente();
            return res.status(200).json(paciente);
        } catch (error) {
            console.log('Erro ao buscar o Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async filtrarPorProntuario(req, res) {
        console.log('Obtendo o Paciente por prontuário...');
        const { prontuario } = req.params;
        try {
            const paciente = await pacienteModel.filtrarPorProntuario(prontuario);
            const endereco = await enderecoModel.obterPorProntuario(prontuario);
            const responsavel = await responsavelModel.obterPorProntuario(prontuario);
            console.log(`Paciente obtido: ${paciente}, endereco: ${endereco}, responsavel: ${responsavel}`);
            res.status(200).json({
                ...paciente,
                endereco,
                responsavel: responsavel
            });
        } catch (error) {
            console.log('Erro ao obter o Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async filtrarPorNome(req, res) {
        const { nome } = req.query;
        console.log('Obtendo o Paciente por nome...');
        try {
            const paciente = await pacienteModel.filtrarPorNome(nome);
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
        const { Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo, Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai, Logradouro, Numero, Bairro, Cidade, Estado, CEP, Complemento, Email  } = req.body;
        let connection;
        try {
            connection = await dataBase.beginTransaction();
            const paciente = new PacientesModel(Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo, Email);
            await pacienteModel.adicionar(paciente, connection);

            if (Nome_Mae || Telefone_Mae || Nome_Pai || Telefone_Pai) {
                const responsavel = new ResponsaveisModel(Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai);
                responsavel.Prontuario = Prontuario;
                await responsavelModel.adicionar(responsavel, connection);
            }

            if (Logradouro || Numero || Complemento || Bairro || Cidade || Estado || CEP) {
                const endereco = new EnderecosModel(Prontuario, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP);
                endereco.Prontuario = Prontuario;
                await enderecoModel.adicionar(endereco, connection);
            }

            await dataBase.commitTransaction(connection);
            return res.status(201).json({ message: 'Paciente adicionado com sucesso!' });
        } catch (error) {
            if (connection) {
                await dataBase.rollbackTransaction(connection);
            }
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
        const { Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo, Email, Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP} = req.body;
        let connection;
        try {
            connection = await dataBase.beginTransaction();
            const paciente = new PacientesModel(Prontuario, Nome_Completo, Data_De_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo, Email);
            await pacienteModel.atualizar(id, paciente, connection);

            if (Nome_Mae || Telefone_Mae || Nome_Pai || Telefone_Pai) {
                const responsavel = new ResponsaveisModel(Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai);
                responsavel.Prontuario = Prontuario;
                await responsavelModel.atualizar(Prontuario, responsavel, connection);
            }

            if (Logradouro || Numero || Complemento || Bairro || Cidade || Estado || CEP) {
                endereco.Prontuario = Prontuario;
                const enderecoModelInstance = new EnderecosModel(Prontuario, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP);
                await enderecoModel.atualizar(Prontuario, enderecoModelInstance, connection);
            }

            await dataBase.commitTransaction(connection);
            return res.status(200).json({ message: 'Paciente atualizado com sucesso!' });
        } catch (error) {
            if (connection) {
                await dataBase.rollbackTransaction(connection);
            }
            console.error('Erro ao atualizar paciente:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async deletar(req, res) {
        console.log('Deletando o Paciente...');
        const { id } = req.params;
        let connection;
        try {
            connection = await dataBase.beginTransaction();

            // Excluir registros das tabelas relacionadas
            await responsavelModel.deletar(id, connection);
            await enderecoModel.deletar(id, connection);

            // Excluir o paciente
            await pacienteModel.deletar(id, connection);

            await dataBase.commitTransaction(connection);
            return res.status(200).json({ message: 'Paciente deletado com sucesso!' });
        } catch (error) {
            if (connection) {
                await dataBase.rollbackTransaction(connection);
            }
            console.error('Erro ao deletar paciente:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PacientesController;
