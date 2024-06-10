const EnderecosModel = require('../model/Entities/pacientesModel/enderecosModel');
const enderecoModel = new EnderecosModel();

class EnderecosController {

    async obterTodos(req, res) {
        try {
            const enderecos = await enderecoModel.obterTodos();
            res.status(200).json(enderecos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterPorProntuario(req, res) {
        const { prontuario } = req.params;
        try {
            const enderecos = await enderecoModel.obterPorProntuario(prontuario);
            res.status(200).json(enderecos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async adicionar(req, res) {
        const { Prontuario, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP } = req.body;
        try {
            const endereco = new EnderecosModel(Prontuario, Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP);
            await enderecoModel.adicionar(endereco);
            res.status(201).json({ message: 'Endereço adicionado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async atualizar(req, res) {
        const { prontuario } = req.params;
        const { Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP } = req.body;
        try {
            await enderecoModel.atualizar(prontuario, { Logradouro, Numero, Complemento, Bairro, Cidade, Estado, CEP });
            res.status(200).json({ message: 'Endereço atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletar(req, res) {
        const { prontuario } = req.params;
        try {
            await enderecoModel.deletar(prontuario);
            res.status(200).json({ message: 'Endereço deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = EnderecosController;
