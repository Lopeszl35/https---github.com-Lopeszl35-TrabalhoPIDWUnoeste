const ServicoModel = require('../model/Entities/servicosModel');

const servicoModel = new ServicoModel;

class ServicoController {
    async obterTodos(req, res) {
        const servicos = await servicoModel.obterTodos();
        return res.status(200).json(servicos);
    }


}
module.exports = ServicoController;