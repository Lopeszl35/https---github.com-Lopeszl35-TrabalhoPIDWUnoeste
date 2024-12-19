const { header } = require("express-validator");

class RelatorioConfigFactory {
    static getConfig(tipo) {
        switch (tipo) {
            case "pacientes":
                return {
                    campos: [
                        { header: "Prontuario", key: "prontuario", width: 15 },
                        { header: "Nome", key: "nome", width: 30 },
                        { header: "Idade", key: "idade", width: 15 },
                        { header: "Data de Nascimento", key: "data_nascimento", width: 20 },
                        { header: "Sexo", key: "sexo", width: 15 },
                        { header: "CPF", key: "cpf", width: 15 },
                        { header: "RG", key: "rg", width: 15 },
                        { header: "Email", key: "email", width: 25 },
                        { header: "Logradouro", key: "logradouro", width: 20},
                        { header: "Cidade", key: "cidade", width: 20},
                        { header: "Estado", key: "estado", width: 20},
                    ],
                };
            case "agendamentos":
                return {
                    campos: [
                        { header: "ID", key: "id_agendamento", width: 15 },
                        { header: "Paciente", key: "paciente", width: 30 },
                        { header: "Profissional", key: "profissional", width: 30 },
                        { header: "Serviço", key: "servico", width: 20 },
                        { header: "Status", key: "status", width: 20 },
                        { header: "Data", key: "data_hora", width: 20 },
                        { header: "observações", key: "observacoes", width: 20 },
                    ],
                };
            default:
                throw new Error(`Tipo de relatório "${tipo}" não suportado.`);
        }
    }
}

module.exports = RelatorioConfigFactory;
