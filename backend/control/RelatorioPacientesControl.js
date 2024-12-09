const { validationResult } = require("express-validator");
const AbstractRelatorioPacientesControl = require("./abstratos/AbstractRelatorioPacientesControl");

class RelatorioPacientesControl extends AbstractRelatorioPacientesControl {
    constructor(relatoriosPacientesModel) {
        super();
        this.relatoriosPacientesModel = relatoriosPacientesModel;
    }

    async relatorioPacientes(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nome, cidade, sexo, idadeMin, idadeMax } = req.query;
        try {
            const filtros = {
                nome: nome || null,
                cidade: cidade || null,
                sexo: sexo || null,
                idadeMin: idadeMin || null,
                idadeMax: idadeMax || null,
            };

            const result = await this.relatoriosPacientesModel.obterRelatorioPacientes(filtros);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao obter relatório de pacientes:", error);
            throw error;
        }
    }

    async distribuicaoPorEstado(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const result = await this.relatoriosPacientesModel.obterDistribuicaoPorEstado();
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao obter distribuição por estado:", error);
            throw error;
        }
    }

    async distribuicaoPorCidade(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const result = await this.relatoriosPacientesModel.obterDistribuicaoPorCidade();
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao obter distribuição por cidade:", error);
            throw error;
        }
    }

    async estatisticasPorFaixaEtaria(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { idadeMin, idadeMax } = req.query;
        if (!idadeMin || !idadeMax) {
            return res.status(400).json({ message: "Idade mínima e máxima devem ser fornecidas." });
        }

        try {
            const result = await this.relatoriosPacientesModel.obterEstatisticasPorFaixaEtaria(idadeMin, idadeMax);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao obter estatísticas por faixa etária:", error);
            throw error;
        }
    }

    async distribuicaoPorSexo(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const result = await this.relatoriosPacientesModel.obterDistribuicaoPorSexo();
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao obter distribuição por sexo:", error);
            throw error;
        }
    }

    async distribuicaoPorDataNascimento(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const result = await this.relatoriosPacientesModel.obterDistribuicaoPorDataNascimento();
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao obter distribuição por data de nascimento:", error);
            throw error;
        }
    }
}

module.exports = RelatorioPacientesControl;
