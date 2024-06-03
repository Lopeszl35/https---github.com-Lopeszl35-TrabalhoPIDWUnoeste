const ServicoModel = require('../model/Entities/servicosModel');

const servicoModel = new ServicoModel;

class ServicoController {
    async obterTodos(req, res) {
        const servicos = await servicoModel.obterTodos();
        return res.status(200).json(servicos);
    }

    async obterPorId(req, res) {
        const { id } = req.params;
        const servico = await servicoModel.obterPorId(id);
        return res.status(200).json(servico);
    }

    async adicionar(req, res) {
        const {Nome_Servico, Descricao, Data_De_Cadastro, Status, Profissional_Responsavel  } = req.body;
        const servico = new ServicoModel(Nome_Servico, Descricao, Data_De_Cadastro, Status, Profissional_Responsavel);

        try {
            await servicoModel.adicionar(servico);
            return res.status(201).json({ message: "Serviço adicionado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: error.message});
        }
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const {Nome_Servico, Descricao, Data_De_Cadastro, Status, Profissional_Responsavel  } = req.body;
        const servico = new ServicoModel(Nome_Servico, Descricao, Data_De_Cadastro, Status, Profissional_Responsavel);
        try {
            await servicoModel.atualizar(id, servico);
            return res.status(200).json({ message: "Serviço atualizado com sucesso!" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: error.message});
        }
    }


}
module.exports = ServicoController;