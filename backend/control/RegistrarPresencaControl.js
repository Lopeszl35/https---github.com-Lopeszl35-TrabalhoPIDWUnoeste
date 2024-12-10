const AbstractRegistrarPresenca = require("./abstratos/AbstractRegistrarPresenca");
const { validationResult } = require("express-validator");

class RegistrarPresencaControl extends AbstractRegistrarPresenca {
    constructor(registrarPresencaModel) {
        super();
        this.registrarPresencaModel = registrarPresencaModel;
    }

    async buscarAgendamentoPorData(data) {
        
    }

    async registrarPresenca(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { idAgendamento, observacoes } = req.query;
        try {
            if(!idAgendamento) {
                throw new Error("Id agendamento não informado")
            }
           const result = await this.registrarPresencaModel.registrarPresenca(idAgendamento, observacoes);
           return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao registrar presença", error.message);
            throw error;
        }
    }
}

module.exports = RegistrarPresencaControl;