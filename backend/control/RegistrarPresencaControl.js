const AbstractRegistrarPresenca = require("./abstratos/AbstractRegistrarPresenca");
const { validationResult } = require("express-validator");

class RegistrarPresencaControl extends AbstractRegistrarPresenca {
    constructor(registrarPresencaModel) {
        super();
        this.registrarPresencaModel = registrarPresencaModel;
    }

    async buscarAgendamentoPorData(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const { data } = req.query
        try {
            console.log("data: ", data)
            if (!data) {
                throw new Error("Data não informada");
            }
            const result = await this.registrarPresencaModel.buscarAgendamentoPorData(data);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao obter agendamentos para data informada, Erro: ", error.message)
            return res.status(500).json({message: error.message})
        }
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
            return res.status(500).json({message: error.message})
        }
    }

    async registrarAusencia(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }
        const { idAgendamento, motivo } = req.query
        if(!motivo) {
            throw new Error("Motivo da ausência deve ser informado");
        }
        try {
            const result = await this.registrarPresencaModel.registrarAusencia(idAgendamento, motivo);
            res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao registrar ausência, Erro: ", error.message)
            res.status(500).json({message: error.message});
        }
    }

    async cancelarAgendamento(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }
        const { idAgendamento, motivo } = req.query;
        if(!motivo) {
            throw new Error("Motivo do cancelamento deve ser informado");
        }
        try {
            const result = await this.registrarPresencaModel.cancelarAgendamento(idAgendamento, motivo);
            res.status(200).json(result)
        } catch (error) {
            console.error("Erro ao cancelar agendamento Erro: ", error.message);
            res.status(500).json({message: error.message});
        }
    }

}

module.exports = RegistrarPresencaControl;