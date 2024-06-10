const ResponsaveisModel = require('../model/Entities/pacientesModel/responsaveisModel');
const responsavelModel = new ResponsaveisModel();

class ResponsaveisController {

    async obterTodos(req, res){
        try {
            const responsaveis = await responsavelModel.obterTodos();
            res.status(200).json(responsaveis);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async obterPorProntuario(req, res) {
        const { prontuario } = req.params;
        try {
            const responsaveis = await responsavelModel.obterPorProntuario(prontuario);
            res.status(200).json(responsaveis);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async adicionar(req, res) {
        const { Prontuario, Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai } = req.body;
        try {
            const responsavel = new ResponsaveisModel(Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai);
            await responsavelModel.adicionar(responsavel);
            res.status(201).json({ message: 'Responsável adicionado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async atualizar(req, res) {
        const { prontuario } = req.params;
        const { Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai } = req.body;
        try {
            await responsavelModel.atualizar(prontuario, { Nome_Mae, Telefone_Mae, Nome_Pai, Telefone_Pai });
            res.status(200).json({ message: 'Responsável atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletar(req, res) {
        const { prontuario } = req.params;
        try {
            await responsavelModel.deletar(prontuario);
            res.status(200).json({ message: 'Responsável deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ResponsaveisController;
